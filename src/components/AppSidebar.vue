
import { RouterLink } from 'vue-router';
<template>
    <aside
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav" id="drawer-navigation">
        <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            <ul class="space-y-2">
                <li>
                    <RouterLink :to="{ name: 'App' }"
                        class="flex items-center p-2 text-base font-medium text-gray-900 rounded-md hover:bg-primary-100 group">
                        <svg aria-hidden="true"
                            class="w-6 h-6 text-gray-500 group-hover:text-primary transition duration-75"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg>
                        <span class="ml-3 group-hover:text-primary">Overview</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'Payment' }"
                        class="flex items-center p-2 text-base font-medium text-gray-900 rounded-md hover:bg-primary-100 group">
                        <!-- <svg aria-hidden="true"
                            class="w-6 h-6 text-gray-500 group-hover:text-primary transition duration-75"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                        </svg> -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500 group-hover:text-primary transition duration-75" height="16" width="18" viewBox="0 0 576 512">
                            <path
                                d="M64 32C28.7 32 0 60.7 0 96v32H576V96c0-35.3-28.7-64-64-64H64zM576 224H0V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V224zM112 352h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16z" />
                        </svg>
                        <span class="ml-3.5 group-hover:text-primary">Profit</span>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div class="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white z-20">
            <ul class="w-full">
                <li>
                    <a href="#"
                        class="py-2 px-4 text-base font-medium text-gray-900 rounded-lg transition duration-75 group flex justify-between items-center border border-red-300 bg-red-100">
                        <span class="text-red-600">Logout</span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" class="fill-red-600"
                            viewBox="0 0 512 512">
                            <path
                                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z" />
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>

<style scoped>
.router-link-exact-active {
    @apply bg-primary-100 border border-primary-200 text-primary
}

.router-link-exact-active svg {
    @apply fill-primary
}
</style>