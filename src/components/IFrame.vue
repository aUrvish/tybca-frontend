<script setup>
import { ref, onMounted } from 'vue';

const frame = ref(null)

onMounted(
    () => {
        console.log(frame);
    }
)
</script>
<template>
    <!-- <iframe ref="frame" class="w-full aspect-video" scrolling="no" seamless="seamless" srcdoc='<script src="https://cdn.tailwindcss.com"></script><img src="https://plus.unsplash.com/premium_photo-1667480556783-119d25e19d6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVtbXl8ZW58MHx8MHx8fDA%3D" class="border w-full aspect-video object-cover rounded-lg" alt="certificate">' ></iframe> -->
    <iframe ref="frame" class="w-full aspect-video border rounded-lg cursor-pointer select-none" scrolling="no" seamless="seamless" srcdoc='<script src="https://cdn.tailwindcss.com"></script><h1 class="text-xl cursor-pointer" >test</h1>' ></iframe>
</template>