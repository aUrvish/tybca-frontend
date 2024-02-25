<script setup>
import { ref } from 'vue'
import Textbox from '@/components/Textbox.vue';
import Btn from '@/components/Btn.vue';

const profileImage = ref(null);
</script>
<template>
    <form @submit.prevent>
        <div class="flex gap-4 items-start flex-col 3lg:flex-row max-w-screen-xl mx-auto">
            <div class="grow w-full">
                <div class="border rounded-md bg-white p-4 mb-4">
                    <h1 class="text-[24px] font-semibold">Student</h1>
                </div>

                <div class="border rounded-md bg-white sm:p-6 p-4">
                    <div
                        class="w-40 group aspect-square border relative rounded-full grid place-items-center bg-white mx-auto overflow-hidden cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-2/4 fill-gray-300" viewBox="0 0 448 512">
                            <path
                                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                        </svg>
                        <div
                            class="absolute h-full w-full bg-[#00000080] z-10 group-hover:visible invisible grid place-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-white w-full max-w-10" viewBox="0 0 640 512"
                                @click="() => profileImage.click()">
                                <path
                                    d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                            </svg>
                        </div>

                        <input type="file" class="hidden" ref="profileImage">
                    </div>

                    <div class="grid sm:grid-cols-2 gap-4 mt-6">
                        <Textbox id="name" label="Name" name="name" placeholder="jone deo" type="text" />
                        <Textbox id="email" label="Email" name="email" placeholder="jonedeo@example.com" type="email" />
                        <div>
                            <div class="relative">
                                <p class="block mb-2 text-sm font-medium text-gray-900">Gender</p>
                                <div class="flex items-center gap-4 mt-4">
                                    <div class="flex items-center">
                                        <label for="male" class="text-sm font-medium text-gray-900">Male</label>
                                        <input type="radio" name="gender" id="male" class="mx-2" checked>
                                    </div>
                                    <div class="flex items-center">
                                        <label for="female" class="text-sm font-medium text-gray-900">Female</label>
                                        <input type="radio" id="female" name="gender" class="mx-2">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Textbox id="mobile" label="Mobile No." name="mobile" placeholder="+91 00000 00000" type="number" />
                        <Textbox id="city" label="City" name="city" placeholder="Mumbai" type="text" />
                        <Textbox id="country" label="country" name="country" placeholder="India" type="text" />
                    </div>

                    <Btn type="submit"
                        class="mt-6 text-white bg-success font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Submit
                    </Btn>
                </div>

            </div>
            <div class="3lg:max-w-[396px]">
                <div class="p-4 border rounded-sm bg-white">
                    <h5 class="text-lg font-semibold mb-4">Course</h5>
                    <div class="flex items-center gap-3 flex-wrap">
                        <p
                            class="px-3 py-1.5 bg-[#BD39FC1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#BD39FC]">
                            Data Science</p>
                        <p
                            class="px-3 py-1.5 bg-[#FD3C3C1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#FD3C3C]">
                            Artificial Intelligence</p>
                        <p
                            class="px-3 py-1.5 bg-[#1F75F71A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#1F75F7]">
                            Big Data</p>
                        <p
                            class="px-3 py-1.5 bg-[#11CD0E1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#11CD0E]">
                            Cloud Computing</p>
                        <p
                            class="px-3 py-1.5 bg-[#00BFFB1A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#00BFFB]">
                            Project Management</p>
                        <p
                            class="px-3 py-1.5 bg-[#0AE1A11A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#0AE1A1]">
                            Networking</p>
                        <p
                            class="px-3 py-1.5 bg-[#FF94321A] rounded-[8px] font-medium lg:text-base text-[15px] text-[#FF9432]">
                            Software Development</p>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>