
<script setup >
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <div class="px-4 py-1 flex items-center justify-between">

            <!-- logo -->
            <RouterLink :to="{ name: 'Login' }">
                <img src="../assets/svgs/logo.svg" alt="Logo">
            </RouterLink>

            <!-- redirect slot -->
            <slot />
        </div>
    </header>
</template>