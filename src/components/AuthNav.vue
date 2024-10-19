
<script setup >
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <div class="px-4 py-2 flex fixed top-0 left-0 right-0 items-center justify-start">

            <!-- logo -->
            <!-- <RouterLink :to="{ name: 'Login' }">
                <img src="../assets/svgs/logo.svg" alt="Logo">
            </RouterLink> -->
            <span></span>

            <!-- github -->
            <div class="flex justify-end items-center">
                <a href="https://github.com/aUrvish/tybca-frontend" class="p-2 rounded-full border bg-white border-gary-200">
                    <img src="@/assets/svgs/github.svg" class="w-5 h-5" alt="github">
                </a>
            </div>
        </div>
    </header>
</template>