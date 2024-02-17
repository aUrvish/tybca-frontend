<template>
    <div class="max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Certificate</h1>

        <div class="mt-5 grid xl:grid-cols-4 md:grid-cols-3 xsm:grid-cols-2 gap-4" >
            <div v-for="i in 4" class="rounded-lg overflow-hidden group cursor-pointer" >
                <router-link to="#">
                    <img src="@/assets/images/certificate template.png" class="border aspect-[5/3.5] w-full rounded-lg" alt="certificate">
                    <div class="px-2 py-2" >
                        <p class="text-sm line-clamp-2 font-medium group-hover:underline">Artificial intelligence certificate</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>