<script setup >
import {ref} from 'vue'
import Donut from '@/components/Donut.vue'
import PaymentTable from './components/PaymentTable.vue';

const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;
const getPropertyArr = (arr , property) => arr.map((curr, index) => curr[property])

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
        <div class="col-start-1 xl:col-span-3 col-span-4">
            <div class="border rounded-md min-h-[200px] bg-white p-4 flex justify-between">
                <div class="border h-fit p-1 aspect-square grid place-items-center rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="w-10" viewBox="0 0 576 512">
                        <path
                            d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
                    </svg>
                </div>
                <div>
                    <h2 class="sm:text-[30px] text-[18px] font-bold">₹500.00</h2>
                    <p class="text-center text-base text-[14px] font-semibold">Total payment</p>
                </div>
            </div>

            <div class="mt-4 md:hidden">
                <Donut :data="paymentData" pattern="₹" :is-prefix="true" title="Payment">
                    ₹{{ sum(getPropertyArr(paymentData, 'data')).toFixed(2) }}
                </Donut>
            </div>
            <PaymentTable :max="10" />
        </div>
        <div class="xl:block hidden">
            <Donut :data="paymentData" pattern="₹" :is-prefix="true" title="Payment">
                ₹{{ sum(getPropertyArr(paymentData, 'data')).toFixed(2) }}
            </Donut>
        </div>
    </div>
</template>