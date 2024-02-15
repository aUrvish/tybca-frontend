<template>
    <nav class="bg-white border-b border-gray-200 sm:px-4 px-2 py-1 fixed left-0 right-0 top-0 z-50">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
                <RouterLink :to="{ name: 'Login' }">
                    <img src="@/assets/svgs/logo.svg" class="max-w-[120px] md:max-w-max py-1.5 md:py-0" alt="Logo">
                </RouterLink>
            </div>
            <div class="flex items-center lg:order-2">
                <button type="button" class="flex mx-2 animate-pulse text-sm rounded-full md:mr-0 w-9 h-9 bg-gray-200 justify-center items-center">
                </button>
                <button type="button" class="flex mx-2 animate-pulse text-sm rounded-full md:mr-0 w-9 h-9 bg-gray-200 justify-center items-center">
                </button>
                <button type="button" class="flex mx-2 animate-pulse text-sm rounded-full md:mr-0 w-9 h-9 bg-gray-200 justify-center items-center">
                </button>
            </div>
        </div>
    </nav>
</template>