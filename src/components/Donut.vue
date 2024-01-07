<script setup >
import { ref } from 'vue';

const options = ref({
    chart: {
        type: 'area',
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z"],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    tooltip: {
        enabled: true,
        x: {
            show: false,
        },
        y: {
            show: false,
        }
    },
    grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
            left: 2,
            right: 2,
            top: 0
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
        },
    },
    yaxis: {
        show: false,
    },
    legend: {
        show: false,
    }
})

const series = ref([{
    name: 'series1',
    data: [31, 40, 28, 51, 42, 109]
}, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52]
}])
</script>

<template>
    <div class="w-full bg-white rounded-lg border pt-4 px-4 md:px-4 md:pt-3.5">
        <div class="flex justify-between">
            <div>
                <h5 class="leading-none sm:text-3xl text-2xl font-bold pb-2">99.99%</h5>
                <p class="text-base font-normal">Performance</p>
            </div>
            <div class="flex items-center px-2.5 py-0.5 sm:text-base text-[13px] font-semibold text-green-500 text-center">
                12%
                <svg class="w-3 h-3 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 10 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13V1m0 0L1 5m4-4 4 4" />
                </svg>
            </div>
        </div>
        <div>
            <apexchart type="area" width="100%" :options="options" :series="series"></apexchart>
        </div>

        <!-- <div class="flex justify-end items-center py-4 mt-2 border-t">
            <a href="#"
                class="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-primary border border-primary-200 hover:bg-primary-100  px-3 py-2">
                Users Report
                <svg class="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 9 4-4-4-4" />
                </svg>
            </a>
        </div> -->
    </div>
</template>