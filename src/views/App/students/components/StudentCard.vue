<template>
    <RouterLink :to="{ name : 'Profile' }" >
        <div
            class="max-w-2xl sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto border rounded-md hover:shadow-lg cursor-pointer group">
            <div class="rounded-t-lg h-32 overflow-hidden">
                <img class="object-cover object-bottom w-full" src='@/assets/images/back-img4.jpg' alt='Mountain'>
            </div>
            <div class="mx-auto w-24 h-24 relative -mt-12 border-4 border-white rounded-full overflow-hidden">
                <img class="object-cover object-center h-24 aspect-square"
                    src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ'
                    alt='Woman looking front'>
            </div>
            <div class="text-center mt-2">
                <h2 class="font-semibold group-hover:underline">#12345678</h2>
                <p class="text-gray-500">Nitesh N Nageshri</p>
            </div>
            <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <li class="flex flex-col items-center justify-around" title="Exam">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22" class="fill-current text-gray-700"
                        viewBox="0 0 576 512">
                        <path
                            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                    </svg>
                    <p class="text-[18px] font-bold mt-2 text-gray-600">2k</p>
                </li>
                <li class="flex flex-col items-center justify-between" title="Exam">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22" class="fill-current text-gray-700"
                        viewBox="0 0 512 512">
                        <path
                            d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
                    </svg>
                    <p class="text-[18px] font-bold mt-2 text-gray-600">2k</p>
                </li>
                <li class="flex flex-col items-center justify-around relative" title="Exam">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22" class="fill-current text-gray-700"
                        viewBox="0 0 512 512">
                        <path
                            d="M453.3 19.3l39.4 39.4c25 25 25 65.5 0 90.5l-52.1 52.1 0 0-1-1 0 0-16-16-96-96-17-17 52.1-52.1c25-25 65.5-25 90.5 0zM241 114.9c-9.4-9.4-24.6-9.4-33.9 0L105 217c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9L173.1 81c28.1-28.1 73.7-28.1 101.8 0L288 94.1l17 17 96 96 16 16 1 1-17 17L229.5 412.5c-48 48-109.2 80.8-175.8 94.1l-25 5c-7.9 1.6-16-.9-21.7-6.6s-8.1-13.8-6.6-21.7l5-25c13.3-66.6 46.1-127.8 94.1-175.8L254.1 128 241 114.9z" />
                    </svg>
                    <p class="text-[18px] font-bold mt-2 text-gray-600">2k</p>
                </li>
            </ul>
            <!-- <div class="p-4 border-t mx-8 mt-2">
                <button
                    class="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Follow</button>
            </div> -->
        </div>
    </RouterLink>
</template>