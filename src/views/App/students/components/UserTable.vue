<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { minidenticon } from 'minidenticons'
import { toast } from "vue3-toastify";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { useRouter } from 'vue-router';
import DeleteConfirm from '@/components/DeleteConfirm.vue';

const { getStudentsAction, getStudentsSeacherAction, removeAction, disableAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const { auth } = storeToRefs(useAuthStore());

const props = defineProps({
    max: {
        default: 5,
    },
    filter: {
        default: 0
    }
})
const studentList = ref([])
const pagination = ref(1)
const router = useRouter()
const miniavtar = (name) => {
    return minidenticon(name)
}

const selectedId = ref(null)

onMounted(
    () => {
        changeStatusLoading(true)
        getStudentsAction(pagination.value)
            .then(
                (res) => {
                    studentList.value = res.data.data;
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
const filterCourse = computed(() => props.filter)
const getStorage = "http://127.0.0.1:8000/storage/";

watch(search,
    (newVal) => {

        changeStatusLoading(true)
        getStudentsSeacherAction({ search: newVal })
            .then(
                (res) => {
                    studentList.value = res.data.data;
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

const removeUserFunc = (id) => {
    changeStatusLoading(true)
    removeAction(id)
        .then(
            (res) => {
                studentList.value.data = studentList.value.data.filter((curr) => curr.id != id);
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

const changeStatus = (status, id) => {
    let payload = {
        status: status,
        id: id
    }

    disableAction(payload)
        .then(
            (res) => {
                toast(res.data.messages, {
                    "type": res.data.status ? "success" : "error",
                    "dangerouslyHTMLString": true
                })
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
                    <h1 class="text-[20px] font-bold">Student {{ filterCourse }}</h1>
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
                                <th scope="col" class="px-4 py-3 text-center">Join Date</th>
                                <th scope="col" class="px-4 py-3 text-center">Performance</th>
                                <th scope="col" class="px-4 py-3 text-center">Status</th>
                                <th scope="col" class="px-4 py-3 flex justify-center">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="[&>*]:whitespace-nowrap border-b" v-for="(std, index) in studentList.data"
                                :key="index">
                                <td scope="row" class="px-4 py-3">
                                    <div class="flex items-center gap-4">
                                        <div class="w-8 aspect-square overflow-hidden border rounded-full">
                                            <img :src="getStorage + std.avatar" class="object-cover w-full h-full" v-if="std.avatar" alt="avtar">
                                            <div v-html="miniavtar(std.name)" v-else class="w-full bg-white"></div>
                                        </div>
                                        <p>#{{ std.id }}</p>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-center">{{ std.name }}</td>
                                <td class="px-4 py-3 text-center">{{ std.email }}</td>
                                <td class="px-4 py-3 text-center">{{ std.mobile }}</td>
                                <td class="px-4 py-3 text-center">{{ new
                        Date(std.created_at).toLocaleDateString().replaceAll("/", "-") }}</td>
                                <td class="px-4 py-3 ">
                                    <div
                                        class="text-center text-success font-semibold flex justify-center items-center">

                                        12%
                                        <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 10 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                                stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                        </svg>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-center">
                                    <span
                                    class="text-[12px] border text-success rounded-md border-success py-1 px-2" v-if="std.status">Active</span>
                                    <span class="text-[12px] border text-red-400 rounded-md border-red-400 py-1 px-2" v-else >Logout</span>
                                </td>

                                <td class="px-4 py-3">
                                    <div class="flex justify-between items-center gap-2">

                                        <label class="inline-flex items-center cursor-pointer" v-if="auth.user.role_id == 0">
                                            <input type="checkbox" class="sr-only peer" :checked="std.disable"
                                                @change="changeStatus($event.target.checked, std.id)">
                                            <div
                                                class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue">
                                            </div>
                                        </label>

                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-blue cursor-pointer w-4"
                                            viewBox="0 0 512 512" @click="router.push(`/profile/${std.id}`)">
                                            <path
                                                d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-success cursor-pointer w-4"
                                            viewBox="0 0 512 512" v-if="auth.user.role_id == 0" @click="router.push(`/profile/edit/${std.id}`)">
                                            <path
                                                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-red-400 cursor-pointer w-4"
                                            viewBox="0 0 448 512" v-if="auth.user.role_id == 0" @click="selectedId = std.id">
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
                        <span class="font-semibold text-gray-900">{{ studentList.total }}</span>
                    </span>
                    <ul class="inline-flex items-stretch -space-x-px">
                        <li>
                            <button
                                :class="studentList.prev_page_url ? 'cursor-pointer hover:bg-gray-100 hover:text-gray-700' : 'bg-slate-100 cursor-auto'"
                                @click="studentList.prev_page_url ? pagination-- : ''"
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
                                :class="studentList.next_page_url ? 'cursor-pointer hover:bg-gray-100 hover:text-gray-700' : 'bg-slate-100 cursor-auto'"
                                @click="studentList.next_page_url ? pagination++ : ''"
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