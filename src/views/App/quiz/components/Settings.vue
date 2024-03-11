<script setup>
import Textbox from '@/components/Textbox.vue';
import {ref} from 'vue'
</script>
<template>
    <div class="grid sm:grid-cols-2 gap-4">
        <div>

            <div class="border bg-white p-4 rounded-md">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Schedule</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>
                <p>date {{ date }}</p>
                <div>
                    <p class="text-gray-400 font-normal">Time :</p>
                    <input type="datetime-local" class="mt-2 border rounded-md py-2 px-4 w-full">
                </div>
                <div class="mt-4">
                    <p class="text-gray-400 font-normal">Duration :</p>
                    <select id="countries"
                        class="bg-gray-50 border border-gray-300 mt-2 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <option selected>Choose a country</option>
                        <option value="30">30 Minutes</option>
                        <option value="1">1 Hours</option>
                        <option value="2">2 Hours</option>
                    </select>
                </div>
            </div>
        </div>

        <div>
            <div class="border bg-white p-4 rounded-md">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Random Question Indexing</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>
            </div>
            <div class="border bg-white p-4 rounded-md mt-4">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Quiz Notify</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>
            </div>
            <div class="border bg-white p-4 rounded-md mt-4">
                <div class="flex justify-between items-center">
                    <p class="text-lg text-gray-600 font-semibold">Nagetive Point</p>
                    <label class="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue">
                        </div>
                    </label>
                </div>
                <hr class="my-5">
                <p class="text-gray-400 italic font-normal text-sm mb-4">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Commodi aut explicabo harum corporis tenetur libero sequi vitae </p>
                <div class="flex justify-between items-center">
                    <p class="text-gray-400 font-normal">Points :</p>
                    <input type="number"
                        class="bg-gray-50 border max-w-[150px] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="1" />
                </div>
            </div>
        </div>
    </div>
</template>