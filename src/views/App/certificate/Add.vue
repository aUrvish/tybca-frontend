<template>
    <div class=" aspect-[2/1] grid place-items-center">
        <div class="max-w-screen-lg w-full group">
            <div class="rounded-md w-full border mb-3 p-1.5 flex items-center gap-1.5 group-hover:visible invisible">
                <div class="mr-3">
                    <button class="py-1 px-2.5 rounded font-bold hover:bg-gray-100">B</button>
                    <button class="py-1 px-3.5 rounded italic hover:bg-gray-100">i</button>
                    <button class="py-1 px-2.5 rounded hover:bg-gray-100 underline">U</button>
                </div>

                <div class="min-w-48 bg-gray-100 py-1 px-2 rounded-md">
                    <select class="w-full bg-transparent outline-0 text-sm ">
                        <option>Arial</option>
                        <option>Arial</option>
                        <option>Arial</option>
                    </select>
                </div>
                <div class="min-w-16 bg-gray-100 py-1 px-2 rounded-md">
                    <select class="w-full bg-transparent outline-0 text-sm ">
                        <option>8</option>
                        <option>10</option>
                        <option>14</option>
                        <option>16</option>
                        <option>18</option>
                        <option>20</option>
                        <option>24</option>
                        <option>32</option>
                        <option>48</option>
                        <option>56</option>
                        <option>64</option>
                        <option>72</option>
                        <option>78</option>
                        <option>92</option>
                        <option>96</option>
                    </select>
                </div>

                <div class="relative max-w-6">
                    <input class="invisible z-10" type="color">
                    <div class="w-5 absolute top-1/2 -translate-y-1/2 aspect-square rounded-sm bg-black"></div>
                </div>

                <div class="ml-3 flex gap-5">

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 cursor-pointer fill-gray-400" viewBox="0 0 448 512">
                            <path
                            d="M448 64c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 cursor-pointer fill-gray-400" viewBox="0 0 448 512">
                            <path d="M352 64c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32H320c17.7 0 32-14.3 32-32z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 cursor-pointer fill-gray-400" viewBox="0 0 448 512">
                            <path d="M288 64c0 17.7-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32H256c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                        </svg>
                </div>
            </div>
            <div
                class="border rounded-md max-w-screen-lg w-full aspect-[5/3] relative overflow-hidden select-none">
            </div>
        </div>
    </div>
</template>