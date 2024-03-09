<script setup>
import Btn from '@/components/Btn.vue'
import NoticeTable from './components/NoticeTable.vue';
import { useRouter } from 'vue-router';

import { toast } from "vue3-toastify";
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia';
import { useLoadStore } from '@/store/loading'
import { useNoticeStore } from '@/store/notice'

const { noticeSaveAction } = useNoticeStore();
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const { auth } = storeToRefs(useAuthStore());

const router = useRouter()

const createNotice = () => {

    let payload = {
        title : "Notice title",
        caption : "Caption ..."
    }

    changeStatusLoading(true)
    noticeSaveAction(payload)
        .then(
            (res) => {
                if (res.data.data) {   
                    router.push(`notice/edit/${res.data.data.id}`)
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
</script>

<template>
    <div class="max-w-screen-xl mx-auto">
        <div class="flex justify-between items-center" >
            <h1 class="text-[24px] font-semibold">Notice</h1>
            <Btn class="text-white bg-gray-950 font-medium rounded-md text-sm px-4 py-2 text-center" 
            v-if="auth.user.role_id != 2" @click="createNotice">
                Create Notice
            </Btn>
        </div>

        <div class="mt-4" >
            <NoticeTable :max="10"/>
        </div>
    </div>
</template>