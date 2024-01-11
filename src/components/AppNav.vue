<script setup >
import { ref ,  computed } from 'vue'

const colours = ref(["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"]);

const username = ref('Mandaliya Urvish');

const nameInit = computed(() => username.value.split(" ")[0].charAt(0).toUpperCase() + username.value.split(" ")[1].charAt(0).toUpperCase())

const randColorIndex = ref(Math.floor(Math.random() * 19))

const isShowNotification = ref(false);
const isShowUserMenu = ref(false);
</script>

<template>
    <nav class="bg-white border-b border-gray-200 sm:px-4 px-2 py-1 fixed left-0 right-0 top-0 z-50">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
                <button class="p-2 mr-2 rounded-full cursor-pointer lg:hidden hover:bg-gray-100">
                    <img src="@/assets/svgs/menu.svg" class="w-6 h-6" alt="menu">
                    <img src="@/assets/svgs/close.svg" class="w-6 h-6 hidden" alt="close">
                </button>
                <RouterLink :to="{ name: 'Login' }">
                    <img src="@/assets/svgs/logo.svg" alt="Logo">
                </RouterLink>
            </div>
            <div class="flex items-center lg:order-2">
                <!-- github -->
                <a href="https://github.com/aUrvish/tybca-frontend"
                    class="p-2 mr-1 rounded-full border hover:bg-gray-100">
                    <img src="@/assets/svgs/github.svg" class="w-5 h-5" alt="github">
                </a>

                <!-- Notifications -->
                <button type="button" class="p-2 mx-1 rounded-full border hover:bg-gray-100 relative" @click="isShowNotification =! isShowNotification" v-click-outside="() => isShowNotification = false">
                    <!-- Bell icon -->
                    <img src="../assets/svgs/bell.svg" class="w-5 h-5" alt="bell">
                    <div class="w-2 aspect-square rounded-full bg-red-500 absolute right-0" ></div>
                </button>

                <!-- Dropdown menu -->
                <div class="overflow-hidden absolute top-full sm:right-5 right-1 z-50 my-4 max-w-sm text-base list-none bg-white rounded-md border" :class="isShowNotification ? '' : 'hidden'"
                    id="notification-dropdown">
                    <div
                        class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
                        Notifications
                    </div>
                    <div class="border-y">
                        <a href="#" class="flex py-3 px-4 hover:bg-gray-100">
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
                    <a href="#"
                        class="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100">
                        <div class="inline-flex items-center">
                            <svg aria-hidden="true" class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                <path fill-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clip-rule="evenodd"></path>
                            </svg>
                            View all
                        </div>
                    </a>
                </div>

                <!-- user menu -->
                <button type="button" class="flex mx-2 text-sm rounded-full md:mr-0 w-9 h-9 justify-center items-center" :style="{ backgroundColor : colours[randColorIndex] }" v-click-outside="() => isShowUserMenu = false" @click="isShowUserMenu =! isShowUserMenu">
                    <!-- <img class="w-9 h-9 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                        alt="user photo" /> -->
                    <h1 class="text-white font-bold" >{{ nameInit }}</h1>
                </button>

                <!-- Dropdown menu -->
                <div class="absolute top-full right-5 z-50 my-4 w-56 text-base list-none bg-white divide-y border rounded-md" :class="isShowUserMenu ? '' : 'hidden'"
                    id="dropdown">
                    <div class="py-3 px-4">
                        <span class="block text-sm font-semibold text-gray-900 dark:text-white">Neil Sims</span>
                        <span class="block text-sm text-gray-900 truncate dark:text-white">name@flowbite.com</span>
                    </div>
                    <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
                        <li>
                            <a href="#"
                                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My
                                profile</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account
                                settings</a>
                        </li>
                    </ul>
                    <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
                        <li>
                            <a href="#"
                                class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign
                                out</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>