<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLoadStore } from '@/store/loading'
import { minidenticon } from 'minidenticons'
import { toast } from "vue3-toastify";
import services from '@/plugins/service'

import { useNoticeStore } from '@/store/notice'

const { noticeGetAllPublishAction } = useNoticeStore();

const userMiniprofile = ref(null)

const { changeStatusLoading } = useLoadStore();
const getStorage = services.storageBaseUrl;

const noticeList = ref([])

onMounted(
    () => {
        changeStatusLoading(true)
        noticeGetAllPublishAction()
            .then(
                (res) => {
                    if (res.data.data) {
                        let data = res.data.data
                        noticeList.value = data
                    }
                    changeStatusLoading(false)
                }
            )
            .catch(
                (e) => {
                    toast(e.response.data.messages, {
                        "type": "error",
                        "dangerouslyHTMLString": true
                    })
                    changeStatusLoading(false)
                }
            )
    }
)

const miniavtar = (name) => {
    return minidenticon(name)
}
</script>
<template>
    <div class="overflow-hidden text-base list-none rounded-md border bg-white" id="notification-dropdown" v-if="noticeList.length">
        <div class="block py-2 px-4 text-base font-medium text-center text-gray-700">
            Notice
        </div>
        <div class="border-t">
            <a :href="`/notice/${notice.uri}`" target="_blank" class="flex py-3 px-4 hover:bg-gray-100"
                v-for="(notice, index) in noticeList.filter((curr, i) => i < 7 )" :key="index">
                <div class="flex-shrink-0">
                    <div class="w-11 h-11 rounded-full overflow-hidden">
                        <img :src="getStorage + notice.user.avatar" class="object-cover w-full h-full"
                            v-if="notice.user.avatar" alt="avtar">
                        <div v-html="miniavtar(notice.user.name)" v-else class="w-full bg-gray-100"></div>
                    </div>
                </div>
                <div class="pl-3 w-full">
                    <div class="text-gray-500 font-normal text-sm mb-1.5">
                        New message from {{ notice.user.name }} "{{ notice.title }}"
                    </div>
                    <div class="text-xs font-medium">
                        {{ new Date(notice.updated_at).toLocaleString() }}
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>