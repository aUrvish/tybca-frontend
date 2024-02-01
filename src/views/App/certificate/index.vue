<template>
    <div class="max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Certificate</h1>

        <div class="grid grid-cols-4 gap-4 mt-10">
            <div
                class="border-[3px] aspect-[5/3] border-dashed py-10 grid place-items-center cursor-pointer border-primary rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="max-w-8 fill-primary" viewBox="0 0 448 512">
                    <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
            </div>

            <div class="border aspect-[5/3] rounded-md">
                <RouterLink :to="{name : 'certificateAdd'}">

                    <img src="https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg"
                        alt="certificate" class="object-contain w-full h-full">
                </RouterLink>
            </div>
        </div>
    </div>
</template>