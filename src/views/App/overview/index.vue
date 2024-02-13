<script setup >
import Donut from '@/components/Donut.vue'
import SocialProf from './components/SocialProf.vue';
import QuizTable from './components/QuizTable.vue';
import UserTable from './components/UserTable.vue';
import PaymentTable from './components/PaymentTable.vue';
import { ref } from 'vue';

const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length || 0;
const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;


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
                            {{ average(PerformanceData.map((curr, index) => curr.data)).toFixed(2) }}%
                        </Donut>
                        <Donut :data="paymentData" pattern="₹" :is-prefix="true" title="Payment">
                            ₹{{ sum(paymentData.map((curr, index) => curr.data)).toFixed(2) }}
                        </Donut>
                    </div>
                    <QuizTable :max="7" />
                    <UserTable :max="7" class="5xl:hidden" />
                    <PaymentTable :max="7" class="5xl:hidden" />
                </div>
                <div class="2lg:block hidden">
                    <div class="overflow-hidden text-base list-none rounded-md border 5xl:hidden xl:block hidden"
                        id="notification-dropdown">
                        <div
                            class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
                            Notice
                        </div>
                        <div class="border-y">
                            <a href="#" class="flex py-3 px-4 hover:bg-gray-100" v-for="i in 7" :key="i">
                                <div class="flex-shrink-0">
                                    <img class="w-11 h-11 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                        alt="Bonnie Green avatar" />
                                </div>
                                <div class="pl-3 w-full">
                                    <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                        New message from Bonnie Green "Hey,
                                        what's up? All set for the presentation?"
                                    </div>
                                    <div class="text-xs font-medium">
                                        a few moments ago
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <Donut class="5xl:mt-0 xl:mt-4" :data="PerformanceData" pattern="%" title="Performance">
                        {{ average(PerformanceData.map((curr, index) => curr.data)).toFixed(2) }}%
                    </Donut>
                    <Donut class="mt-4" :data="paymentData" pattern="₹" :is-prefix="true" title="Payment">
                        ₹{{ sum(paymentData.map((curr, index) => curr.data)).toFixed(2) }}
                    </Donut>
                </div>
            </div>
        </div>
        <div>

            <div class="overflow-hidden text-base list-none rounded-md border 5xl:block hidden" id="notification-dropdown">
                <div
                    class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
                    Notice
                </div>
                <div class="border-y last:border-b-0">
                    <a href="#" class="flex py-3 px-4 hover:bg-gray-100" v-for="i in 7" :key="i">
                        <div class="flex-shrink-0">
                            <img class="w-11 h-11 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                alt="Bonnie Green avatar" />
                        </div>
                        <div class="pl-3 w-full">
                            <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                New message from Bonnie Green "Hey,
                                what's up? All set for the presentation?"
                            </div>
                            <div class="text-xs font-medium">
                                a few moments ago
                            </div>
                        </div>
                    </a>
                </div>
            </div>

        </div>
    </div>
    <div class="5xl:grid grid-cols-2 gap-4 hidden">
        <div>
            <UserTable :max="7" />
        </div>
        <div>
            <PaymentTable :max="7" />
        </div>
    </div>
</template>