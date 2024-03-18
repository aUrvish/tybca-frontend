<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
const emit = defineEmits(['countTotalResponce'])
import { minidenticon } from 'minidenticons'
import { toast } from "vue3-toastify";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { useRouter, useRoute } from 'vue-router';
import DeleteConfirm from '@/components/DeleteConfirm.vue';
import debounce from 'lodash.debounce'

const { getStudentsAction, getStudentsSeacherAction, removeAction, disableAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const { auth } = storeToRefs(useAuthStore());
import { useQuizStore } from '@/store/quiz'
const { getAllResponceAction, getSingleResponceAction, removeResponceAction } = useQuizStore();

const props = defineProps({
    max: {
        default: 5,
    },
    filter: {
        default: 0
    }
})
const responceList = ref([])
const pagination = ref(1)
const router = useRouter()
const route = useRoute()
const miniavtar = (name) => {
    return minidenticon(name)
}

const selectedId = ref(null)

onMounted(
    () => {
        changeStatusLoading(true)
        getAllResponceAction(route.params.id ,pagination.value)
            .then(
                (res) => {
                    console.log(res.data.data);
                    responceList.value = res.data.data;
                    emit('countTotalResponce', responceList.value.total)
                    changeStatusLoading(false)
                }
            )
            .catch(
                (e) => {
                    toast(e.response.data.messages, {
                        "type": "error",
                        "dangerouslyHTMLString": true
                    })
                    changeStatusLoading(false)
                }
            )
    }
)

const search = ref(null)
import services from '@/plugins/service'
const getStorage = services.storageBaseUrl;


watch(search,
    debounce((newVal) => {

        changeStatusLoading(true)
        getStudentsSeacherAction({ search: newVal })
            .then(
                (res) => {
                    responceList.value = res.data.data;
                    changeStatusLoading(false)
                }
            )
            .catch(
                (e) => {
                    toast(e.response.data.messages, {
                        "type": "error",
                        "dangerouslyHTMLString": true
                    })
                    changeStatusLoading(false)
                }
            )

    }, 800)
)

watch(
    pagination,
    debounce((newVal) => {
        console.log(newVal);
        changeStatusLoading(true)
        getStudentsAction(newVal)
            .then(
                (res) => {
                    responceList.value = res.data.data;
                    changeStatusLoading(false)
                }
            )
            .catch(
                (e) => {
                    toast(e.response.data.messages, {
                        "type": "error",
                        "dangerouslyHTMLString": true
                    })
                    changeStatusLoading(false)
                }
            )

    }, 800)
)

const removeUserFunc = (id) => {
    changeStatusLoading(true)
    removeResponceAction(id)
        .then(
            (res) => {
                responceList.value.data = responceList.value.data.filter((curr) => curr.id != id);
                changeStatusLoading(false)
            }
        )
        .catch(
            (e) => {
                console.log(e);
                toast(e.response.data.messages, {
                    "type": "error",
                    "dangerouslyHTMLString": true
                })
                changeStatusLoading(false)
            }
        ).finally(
            () => selectedId.value = false
        )
}
</script>

<template>
    <section class="bg-gray-50 pt-4">
        <div>
            <!-- Start coding here -->
            <div class="bg-white relative border sm:rounded-lg overflow-hidden">
                <div class="flex items-center justify-between p-4 border-b">
                    <h1 class="text-[20px] font-bold">Responce</h1>
                    <div class="w-full sm:max-w-[200px] max-w-[150px]">
                        <form class="flex items-center">
                            <label for="simple-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor"
                                        viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2"
                                    placeholder="Search" v-model="search">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs border-b uppercase">
                            <tr class="[&>*]:whitespace-nowrap">
                                <th scope="col" class="px-4 py-3">Student ID</th>
                                <th scope="col" class="px-4 py-3 text-center">Student Name</th>
                                <th scope="col" class="px-4 py-3 text-center">E-Mail</th>
                                <th scope="col" class="px-4 py-3 text-center">Mobile</th>
                                <th scope="col" class="px-4 py-3 text-center">Responce at</th>
                                <th scope="col" class="px-4 py-3 flex justify-center">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="[&>*]:whitespace-nowrap border-b" v-for="(res, index) in responceList.data"
                                :key="index">
                                <td scope="row" class="px-4 py-3">
                                    <div class="flex items-center gap-4">
                                        <div class="w-8 aspect-square overflow-hidden border rounded-full">
                                            <img :src="getStorage + res.user.avatar" class="object-cover w-full h-full"
                                                v-if="res.user && res.user.avatar" alt="avtar">
                                            <div v-html="miniavtar(res.user.name)" v-else class="w-full bg-white"></div>
                                        </div>
                                        <p>#{{ res.user.id }}</p>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-center">{{ res.user.name }}</td>
                                <td class="px-4 py-3 text-center">{{ res.user.email }}</td>
                                <td class="px-4 py-3 text-center">{{ res.user.mobile }}</td>
                                <td class="px-4 py-3 text-center">{{ new
                                        Date(res.created_at).toLocaleDateString().replaceAll("/", "-") }}</td>

                                <td class="px-4 py-3">
                                    <div class="flex justify-between items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-blue cursor-pointer w-4" viewBox="0 0 576 512" @click="$emit('showSingleResponse' , res.id)">
                                            <path
                                                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-red-400 cursor-pointer w-4"
                                            viewBox="0 0 448 512" v-if="auth.user.role_id == 0"
                                            @click="selectedId = res.id">
                                            <path
                                                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <nav class="flex justify-between items-center space-y-0 p-4" aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500">
                        Result
                        <span class="font-semibold text-gray-900">{{ responceList.total }}</span>
                    </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <li>
                            <button
                                :class="responceList.prev_page_url ? 'cursor-pointer hover:bg-gray-100 hover:text-gray-700' : 'bg-slate-100 cursor-auto'"
                                @click="responceList.prev_page_url ? pagination-- : ''"
                                class="flex items-center justify-center gap-1 h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 ">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span>Prev</span>
                            </button>
                        </li>
                        <li>
                            <button
                                :class="responceList.next_page_url ? 'cursor-pointer hover:bg-gray-100 hover:text-gray-700' : 'bg-slate-100 cursor-auto'"
                                @click="responceList.next_page_url ? pagination++ : ''"
                                class="flex items-center justify-center gap-1 h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 ">
                                <span>Next</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <DeleteConfirm v-if="selectedId" @delete="removeUserFunc(selectedId)" @close="selectedId = null" />
    </section>
</template>