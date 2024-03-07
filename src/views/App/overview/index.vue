<script setup>
import Donut from '@/components/Donut.vue'
import SocialProf from './components/SocialProf.vue';
import QuizTable from './components/QuizTable.vue';
import UserTable from './components/UserTable.vue';
import Notice from './components/Notice.vue';
import { ref } from 'vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
const { auth } = storeToRefs(useAuthStore());

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
    <div class="3lg:max-w-screen-xl max-w-screen-lg mx-auto">
        <div class="3lg:flex gap-4">
            <div class="grow">
                <SocialProf class="grid sm:grid-cols-3 grid-cols-1 gap-4 " />
                <QuizTable :max="5" />
                <UserTable :max="5" name="Student" v-if="auth.user.role_id == 0 || auth.user.role_id == 1" />
                <UserTable :max="5" name="Teacher" v-if="auth.user.role_id == 0" />
            </div>
            <div class="max-w-sm w-full 3lg:block hidden">
                <Notice />
                <Donut :data="PerformanceData" pattern="%" title="Performance" class="mt-4">
                    {{ average(getPropertyArr(PerformanceData, 'data')).toFixed(2) }}%
                </Donut>
            </div>
        </div>
    </div>

</template>