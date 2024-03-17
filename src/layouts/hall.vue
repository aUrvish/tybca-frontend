<script setup >
import AppNav from '@/components/AppNav.vue';
import HallNav from '@/components/HallNav.vue';

const props = defineProps({
    quiz : {
        require : true
    }
})

</script>

<template>
    <div class="flex flex-col h-full">
        <div class="fixed left-0 right-0 top-0 z-50" >
            <AppNav :noSidebar="false" />
            <HallNav :quiz="quiz" v-if="Object.keys(quiz).length && quiz.questions" />
        </div>
        <div class="h-screen pt-28">
            <slot />
        </div>
    </div>
</template>