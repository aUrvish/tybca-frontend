<script setup>
import { minidenticon } from 'minidenticons'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import services from '@/plugins/service'
const props = defineProps({
    max: {
        default: 5,
    },
    name: {
        default: "User"
    },
    data: {
        default: []
    }
})
const getStorage = services.storageBaseUrl;
const isShowActionMenu = ref(null)
const showActionMenu = (index) => {
    if (isShowActionMenu.value == index) {
        isShowActionMenu.value = null
        return null
    }
    isShowActionMenu.value = index
}

const hideActionMenu = (index) => {
    if (isShowActionMenu.value == index) {
        isShowActionMenu.value = null
    }
}

const router = useRouter();
const miniavtar = (name) => {
    return minidenticon(name)
}
</script>

<template>
    <section class="bg-gray-50 pt-4">
        <div>
            <!-- Start coding here -->
            <div class="bg-white relative border sm:rounded-lg overflow-hidden">
                <div class="flex items-center justify-between p-4 border-b">
                    <h1 class="text-[20px] font-bold">{{ name }}</h1>
                    <div class="w-full sm:max-w-[200px] max-w-[150px]">
                        <slot />
                    </div>
                </div>
                <div class="overflow-x-auto" v-if="data.length">
                    <table class="w-full text-sm text-left">
                        <thead class="text-xs border-b uppercase">
                            <tr class="[&>*]:whitespace-nowrap">
                                <th scope="col" class="px-4 py-3">{{ name }} ID</th>
                                <th scope="col" class="px-4 py-3 text-center">{{ name }} Name</th>
                                <th scope="col" class="px-4 py-3 text-center">E-Mail</th>
                                <th scope="col" class="px-4 py-3 text-center">Mobile</th>
                                <th scope="col" class="px-4 py-3 text-center">Status</th>
                                <th scope="col" class="px-4 py-3">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="[&>*]:whitespace-nowrap" :class="index < max ? 'border-b' : ''"
                                v-for="(user, index) in data" :key="index">
                                <td scope="row" class="px-4 py-3">
                                    <div class="flex items-center gap-4">
                                        <div class="w-8 aspect-square overflow-hidden border rounded-full">
                                            <img :src="getStorage + user.avatar" class="object-cover w-full h-full" v-if="user.avatar" alt="avtar">
                                            <div v-html="miniavtar(user.name)" v-else class="w-full bg-white"></div>
                                        </div>
                                        <p>#{{ user.id }}</p>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-center">{{ user.name }}</td>
                                <td class="px-4 py-3 text-center">{{ user.email }}</td>
                                <td class="px-4 py-3 text-center">{{ user.mobile }}</td>
                                <td class="px-4 py-3 text-center">
                                    <span class="text-[12px] border text-success rounded-md border-success py-1 px-2"
                                        v-if="user.status">Active</span>
                                    <span class="text-[12px] border text-red-400 rounded-md border-red-400 py-1 px-2"
                                        v-else>Logout</span>
                                </td>
                                <td class="px-4 pl-1 py-3 relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="fill-blue cursor-pointer w-4"
                                        viewBox="0 0 512 512" @click="router.push(`/profile/${user.id}`)">
                                        <path
                                            d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p v-if="data?.length == 0" class="px-4 py-2 border-b" >No Data Found</p>
                </div>
            </div>
        </div>
    </section>
</template>