<script setup >
import { ref, onMounted } from 'vue';

const props = defineProps({
    data : {
        default : [
            {
                time : '2018-09-19',
                data : 0
            }
        ]
    },
    pattern : {
        default : null
    },
    isPrefix : {
        default : false
    },
    title : {
        required : true,
    }
})

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
        categories: props.data.map((curr , index) => curr.time),
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
            formatter: function (value) {
                return props.isPrefix ? props.pattern + value : value + props.pattern;
            }
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
    name: props.title,
    data: props.data.map((curr , index) => curr.data)
}])


const performance = ref(0)

const getPerformance = (arr) => {
    let lastEle = arr[arr.length - 1]
    let SecLastEle = arr[arr.length - 2]
    performance.value = lastEle - SecLastEle || 0
}

onMounted(
    () => {
        getPerformance(props.data.map((curr , index) => curr.data))
    }
)
</script>

<template>
    <div class="w-full bg-white rounded-lg border pt-4 px-4 md:px-4 md:pt-4">
        <div class="flex justify-between">
            <div>
                <h5 class="leading-none sm:text-2xl text-xl font-bold pb-1.5">
                    <slot/>
                </h5>
                <p class="text-sm font-normal">{{ title }}</p>
            </div>
            <div class="flex items-center px-2.5 py-0.5 sm:text-base text-[13px] font-semibold  text-center"
            :class="performance < 0 ? 'text-red-400' : 'text-green-500'">
                {{ isPrefix ? pattern + Math.abs(performance).toFixed(2) || 0 :  Math.abs(performance).toFixed(2) + pattern || 0 }}
                <svg class="w-3 h-3 ms-1" :class="performance == 0 ? 'hidden' : performance < 0 ? 'rotate-180' : ''" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 10 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13V1m0 0L1 5m4-4 4 4" />
                </svg>
            </div>
        </div>
        <div>
            <apexchart type="area" width="100%" :options="options" :series="series"></apexchart>
        </div>
    </div>
</template>