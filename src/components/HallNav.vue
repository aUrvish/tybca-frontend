<script setup>
const props = defineProps({
    quiz: {
        require: true
    }
})

const sum = (arr) => arr.reduce((p, c) => p + c, 0) || 0;

const getPointSum = (arr) => {
    let point = arr.map(
        (curr) => curr.point
    )

    return sum(point);
}
</script>

<template>
    <nav class="bg-white border-b border-gray-200 sm:px-4 px-2 py-2 z-50">
        <div class="lg:grid flex justify-around flex-wrap gap-2 grid-cols-3 items-center">
            <div v-if="quiz.title">
                <p class="font-semibold text-gray-400 sm:text-base text-sm">{{ quiz.title }}</p>
            </div>
            <div v-if="quiz.course">
                <p class="xsm:px-3 px-2 py-1 w-fit mx-auto rounded-[8px] font-medium lg:text-base text-[12px]"
                    :style="{ color: quiz.course.primary_color, backgroundColor: `${quiz.course.primary_color}1A` }">
                    {{ quiz.course.name }}
                </p>
            </div>

            <div class="md:flex justify-end hidden" v-if="quiz.questions">
                <div class="flex items-center gap-2 w-fit">
                    <p
                        class="px-3 py-1 w-fit mx-auto bg-gray-100 rounded-[8px] font-normal lg:text-sm text-[12px] text-gray-500">
                        {{ getPointSum(quiz.questions) }} Marks</p>
                    <p
                        class="px-3 py-1 w-fit mx-auto bg-gray-100 rounded-[8px] font-medium lg:text-sm text-[12px] text-gray-500">
                        {{ quiz.questions.length }} Questions</p>
                </div>
            </div>
        </div>
    </nav>
    <div class="z-[100] sticky top-0">
        <div class='h-[3px] w-full bg-transparent overflow-hidden'>
            <div class='w-1/4 h-full bg-primary left-right'></div>
        </div>
    </div>
</template>