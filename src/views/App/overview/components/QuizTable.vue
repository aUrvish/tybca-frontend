<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { minidenticon } from 'minidenticons'
import { toast } from "vue3-toastify";
import { storeToRefs } from 'pinia';
import { useQuizStore } from '@/store/quiz'
import { useLoadStore } from '@/store/loading'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router';
import DeleteConfirm from '@/components/DeleteConfirm.vue';
import debounce from 'lodash.debounce'

const { getAllAction, removeQuizAction, getAllSeacherAction } = useQuizStore();
const { getOverviewQuizAction } = useAuthStore();
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
const QuizList = ref([])
const router = useRouter()

const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;

const getPointSum = (arr) => {
    let point = arr.map(
        (curr) => curr.point
    )

    return sum(point);
}

onMounted(
    () => {
        changeStatusLoading(true)
        getOverviewQuizAction()
            .then(
                (res) => {
                    QuizList.value = res.data.data;
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

watch(search,
    debounce((newVal) => {

        changeStatusLoading(true)
        getAllSeacherAction({ search: newVal })
            .then(
                (res) => {
                    QuizList.value = res.data.data.data.filter((curr, index) => index < 5);
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

const getStatus = (start, duration) => {
    if (start) {
        let startAt = new Date(start);
        let endAt = new Date(new Date(start).getTime() + Number(duration) * 60000);
        let now = new Date()

        if (endAt.valueOf() < now.valueOf()) {
            return 3
        }

        if (now.valueOf() < startAt.valueOf()) {
            return 2
        }

        if (now.valueOf() >= startAt.valueOf() && now.valueOf() <= endAt.valueOf()) {
            return 1
        }
    }else {
        return 1
    }
}

</script>

<template>
    <section class="bg-gray-50 pt-4">
        <div>
            <!-- Start coding here -->
            <div class="bg-white relative border sm:rounded-lg overflow-hidden">
                <div class="flex items-center justify-between p-4 border-b">
                    <h1 class="text-[20px] font-bold">Student</h1>
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
                                <th scope="col" class="px-4 py-3">Quiz ID</th>
                                <th scope="col" class="px-4 py-3 text-center">Quiz Name</th>
                                <th scope="col" class="px-4 py-3 text-center">Cource</th>
                                <th scope="col" class="px-4 py-3 text-center">Total Marks</th>
                                <th scope="col" class="px-4 py-3 text-center">Total question</th>
                                <th scope="col" class="px-4 py-3 text-center">Date</th>
                                <th scope="col" class="px-4 py-3 text-center">Status</th>
                                <th scope="col" class="px-4 py-3 flex justify-center">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="[&>*]:whitespace-nowrap border-b" v-for="(std, index) in QuizList"
                                :key="index">
                                <td class="px-4 py-3">#{{ std.id }}</td>
                                <td class="px-4 py-3 text-center">{{ std.title }}</td>
                                <td class="px-4 py-3 text-center">{{ std.course.name }}</td>
                                <td class="px-4 py-3 text-center">{{ getPointSum(std.questions) }}</td>
                                <td class="px-4 py-3 text-center">{{ std.questions.length }}</td>
                                <td class="px-4 py-3 text-center">{{ std.start_at ? new
            Date(std.start_at).toLocaleDateString().replaceAll("/", "-") : "-" }}</td>
                                <td class="px-4 py-3 text-center">
                                    <span
                                    class="text-[12px] border text-success rounded-md border-success py-1 px-2" v-if="getStatus(std.start_at, std.duration) == 1">Active</span>
                                    <span class="text-[12px] border text-warning rounded-md border-warning py-1 px-2" v-else-if="getStatus(std.start_at, std.duration) == 2" >Pending</span>
                                    <span class="text-[12px] border text-primary rounded-md border-primary py-1 px-2" v-else >Ended</span>

                                </td>

                                <td class="px-4 py-3">
                                    <div class="flex justify-between items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-blue cursor-pointer w-4"
                                            viewBox="0 0 512 512" @click="router.push(`/test/${std.uri}`)">
                                            <path
                                                d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                                        </svg>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-if="QuizList?.length == 0" class="px-4 py-2 border-b" >No Data Found</p>
                </div>
            </div>
        </div>
    </section>
</template>