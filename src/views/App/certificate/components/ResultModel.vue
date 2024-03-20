<script setup>
import { toPng } from 'html-to-image';
import { ref, onMounted } from 'vue'
const resultEle = ref(null);
const downloadUrl = ref(null)
onMounted(
    () => {
        toPng(resultEle.value)
            .then(
                (dataUrl) => {
                    downloadUrl.value = dataUrl;
                }
            )
    }
)
</script>

<template>
    <div
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-[#00000080]">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-screen-lg h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow ">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 class="text-xl font-semibold text-gray-900 ">
                        Responce
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                        @click="$emit('close')" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5 space-y-4" ref="resultEle">


                    <div class="h-full container mx-auto grid place-items-center max-w-screen-sm"> <!-- certificate --> <div class="border relative max-w-screen-lg w-full aspect-[5/3.5] bg-[length:100%_100%] bg-no-repeat" style="background-image: url('./src/assets/images/certi1.png');"> <p style='font-family: Lato' class="uppercase text-[36px] font-medium text-center absolute w-full top-[16%]"> Certificate</p> <p style='font-family: Lato' class="text-[22px] text-center absolute w-full top-[26%]"> Of Appreciation</p> <p style='font-family: Lato' class="text-[16px] text-center absolute w-full top-[34%]"> This certificate is presented to</p> <p style='font-family: Great vibes ' class="text-[36px] text-center absolute w-full top-[42%] capitalize"> Benjamin Shah</p> <p style='font-family: Lato' class="text-[14px] text-center absolute w-full top-[54%]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br> tempor incididunt ut labore et dolore magna aliqua.</p> <div class="container"> <div class="grid grid-cols-3 absolute w-full top-[68%] mx-5"> <div class="max-w-sm overflow-hidden ms-5 text-center"> </div> <div class=""> <img src="@/assets/images/stamp1.webp" class="aspect-squre w-14 mx-auto" alt="stamp"> </div> <div class="max-w-sm overflow-hidden ms-5 text-center"> <img src="@/assets/images/sign2.png" class="aspect-squre mx-auto w-16" style="margin-left: 20%;" alt="sign"> <p class="font-medium text-[12px] text-center mt-1 me-20 ">Tom cruise</p> <p class=" text-[12px] text-center me-20 uppercase">REPRESENTATIVES</p> </div> </div> </div> </div> </div>

                </div>
                <!-- Modal footer -->
                <div class="flex items-center justify-between p-4 md:p-4 border-t border-gray-200 rounded-b ">
                    <button @click="$emit('close')" type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10">Close</button>
                    <a :href="downloadUrl" download
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-primary rounded-lg hover:text-blue-700 focus:z-10">Download</a>
                </div>
            </div>
        </div>
    </div>
</template>