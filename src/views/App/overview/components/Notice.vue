<template>
    <div class="overflow-hidden text-base list-none rounded-md border bg-white"
        id="notification-dropdown">
        <div
            class="block py-2 px-4 text-base font-medium text-center text-gray-700">
            Notice
        </div>
        <div class="border-t">
            <a href="#" class="flex py-3 px-4 hover:bg-gray-100" v-for="i in 7" :key="i">
                <div class="flex-shrink-0">
                    <img class="w-11 h-11 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                        alt="Bonnie Green avatar" />
                </div>
                <div class="pl-3 w-full">
                    <div class="text-gray-500 font-normal text-sm mb-1.5">
                        New message from Bonnie Green "Hey,
                        what's up? All set for the presentation?"
                    </div>
                    <div class="text-xs font-medium">
                        a few moments ago
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>