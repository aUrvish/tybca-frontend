<script setup >
import Donut from '@/components/Donut.vue'
import SocialProf from './components/SocialProf.vue';
import QuizTable from './components/QuizTable.vue';
import UserTable from './components/UserTable.vue';
import Notice from './components/Notice.vue';
import { ref } from 'vue';

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length || 0;
const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;
const getPropertyArr = (arr, property) => arr.map((curr, index) => curr[property])


const PerformanceData = ref([
    {
        time: '2018-09-19',
        data: 95
    },
    {
        time: '2019-04-13',
        data: 87
    },
    {
        time: '2019-11-05',
        data: 92
    },
    {
        time: '2020-03-21',
        data: 98
    },
    {
        time: '2020-10-01',
        data: 96
    },
])

const paymentData = ref([
    {
        time: '2018-09-19',
        data: 6
    },
    {
        time: '2019-04-13',
        data: 10
    },
    {
        time: '2019-11-05',
        data: 15
    },
    {
        time: '2020-03-21',
        data: 20
    },
    {
        time: '2020-10-01',
        data: 24
    },
])
</script>
<template>
    <div class="grid gap-4 grid-cols-4 overflow-hidden">
        <div class="col-start-1 5xl:col-end-4 col-end-5">
            <div class="2lg:grid grid-cols-3 gap-4">
                <div class="col-start-1 col-end-3">
                    <SocialProf class="grid sm:grid-cols-3 grid-cols-1 gap-4 " />
                    <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-5 2lg:hidden">
                        <Donut :data="PerformanceData" pattern="%" title="Performance">
                            {{ average(getPropertyArr(PerformanceData, 'data')).toFixed(2) }}%
                        </Donut>
                        <Donut :data="paymentData" pattern="₹" :is-prefix="true" title="Payment">
                            ₹{{ sum(getPropertyArr(paymentData, 'data')).toFixed(2) }}
                        </Donut>
                    </div>
                    <QuizTable :max="7" />
                    <UserTable :max="7" name="Student" class="5xl:hidden">
                        <form class="flex items-center w-full">
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
                                    placeholder="Search">
                            </div>
                        </form>
                    </UserTable>
                    <UserTable :max="7" name="Teacher"  class="5xl:hidden">
                        <form class="flex items-center w-full">
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
                                    placeholder="Search">
                            </div>
                        </form>
                    </UserTable>
                </div>
                <div class="2lg:block hidden">
                    <Notice class="5xl:hidden xl:block hidden" />
                    <Donut class="5xl:mt-0 xl:mt-4" :data="PerformanceData" pattern="%" title="Performance">
                        {{ average(getPropertyArr(PerformanceData, 'data')).toFixed(2) }}%
                    </Donut>
                    <Donut class="mt-4" :data="paymentData" pattern="₹" :is-prefix="true" title="Payment">
                        ₹{{ sum(getPropertyArr(paymentData, 'data')).toFixed(2) }}
                    </Donut>
                </div>
            </div>
        </div>
        <div>
            <Notice class="5xl:block hidden" />
        </div>
    </div>
    <div class="5xl:grid grid-cols-2 gap-4 hidden">
        <div>
            <UserTable name="Student" :max="7">
                <form class="flex items-center w-full">
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
                                    placeholder="Search">
                            </div>
                        </form>
            </UserTable>
        </div>
        <div>
            <UserTable name="Teacher" :max="7">
                <form class="flex items-center w-full">
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
                                    placeholder="Search">
                            </div>
                        </form>
            </UserTable>
        </div>
    </div>
</template>