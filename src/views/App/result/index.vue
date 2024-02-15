<template>
    <div class="max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Results</h1>

        <div class="mt-5 grid grid-cols-5 gap-4" >
            <div v-for="i in 5" class="rounded-lg overflow-hidden group cursor-pointer" >
                <router-link to="#">
                    <img src="@/assets/images/result.png" class="border aspect-[3.5/5] w-full rounded-lg" alt="certificate">
                    <div class="px-2 py-2" >
                        <p class="text-sm line-clamp-2 font-medium group-hover:underline">Exam 2024-25 result</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>