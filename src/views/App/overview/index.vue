<script setup >
import Donut from '@/components/Donut.vue'
import SocialProf from './components/SocialProf.vue';
import Table from '@/components/Table.vue';
</script>
<template>
    <div class="grid gap-4 grid-cols-4 overflow-hidden">
        <div class="col-start-1 5xl:col-end-4 col-end-5">
            <div class="2lg:grid grid-cols-3 gap-4">
                <div class="col-start-1 col-end-3">
                    <SocialProf class="grid sm:grid-cols-3 grid-cols-1 gap-4 " />
                    <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-5 2lg:hidden" >
                        <Donut />
                        <Donut />
                    </div>
                    <Table :max="7" />
                    <Table :max="7" class="5xl:hidden" />
                    <Table :max="7" class="5xl:hidden" />
                </div>
                <div class="2lg:block hidden">
                    <div class="overflow-hidden text-base list-none rounded-md border 5xl:hidden xl:block hidden"
                        id="notification-dropdown">
                        <div
                            class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
                            Notifications
                        </div>
                        <div class="border-y">
                            <a href="#" class="flex py-3 px-4 hover:bg-gray-100" v-for="i in 7" :key="i">
                                <div class="flex-shrink-0">
                                    <img class="w-11 h-11 rounded-full"
                                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                        alt="Bonnie Green avatar" />
                                </div>
                                <div class="pl-3 w-full">
                                    <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                        New message from Bonnie Green "Hey,
                                        what's up? All set for the presentation?"
                                    </div>
                                    <div class="text-xs font-medium">
                                        a few moments ago
                                    </div>
                                </div>
                            </a>
                        </div>
                        <!-- <a href="#"
                    class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-primary-100">
                    <div class="inline-flex items-center">
                        <svg aria-hidden="true" class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                            <path fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        View all
                    </div>
                </a> -->
                    </div>
                    <Donut class="5xl:mt-0 xl:mt-4" />
                    <Donut class="mt-4" />
                </div>
            </div>
        </div>
        <div>

            <div class="overflow-hidden text-base list-none rounded-md border 5xl:block hidden" id="notification-dropdown">
                <div
                    class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
                    Notifications
                </div>
                <div class="border-y">
                    <a href="#" class="flex py-3 px-4 hover:bg-gray-100" v-for="i in 7" :key="i">
                        <div class="flex-shrink-0">
                            <img class="w-11 h-11 rounded-full"
                                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                alt="Bonnie Green avatar" />
                        </div>
                        <div class="pl-3 w-full">
                            <div class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                                New message from Bonnie Green "Hey,
                                what's up? All set for the presentation?"
                            </div>
                            <div class="text-xs font-medium">
                                a few moments ago
                            </div>
                        </div>
                    </a>
                </div>
                <!-- <a href="#"
                    class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-primary-100">
                    <div class="inline-flex items-center">
                        <svg aria-hidden="true" class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                            <path fill-rule="evenodd"
                                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                clip-rule="evenodd"></path>
                        </svg>
                        View all
                    </div>
                </a> -->
            </div>

        </div>
    </div>
    <div class="5xl:grid grid-cols-2 gap-4 hidden">
        <div>
            <Table :max="7" />
        </div>
        <div>
            <Table :max="7" />
        </div>
    </div>
</template>