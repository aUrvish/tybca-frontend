<script setup>
import Editor from '@tinymce/tinymce-vue'
import Btn from '@/components/Btn.vue';
import { onMounted, reactive, ref, watch } from 'vue'
import service from '@/plugins/service';
import { toast } from "vue3-toastify";
import { storeToRefs } from 'pinia';
import { useLoadStore } from '@/store/loading'
import { useNoticeStore } from '@/store/notice'
import { useRoute, useRouter } from 'vue-router';
import debounce from 'lodash.debounce';

const { noticeSaveAction, noticePublishAction, noticeShowAction } = useNoticeStore();
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());


const editorInit = ref(
    {
        toolbar_mode: 'sliding',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        images_upload_url : `${service.apiBaseUrl}/api/image-upload`,
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
        ],
        draggable_modal: true
    })

const route = useRoute()
const router = useRouter()

const notice = reactive(
    {
        id: route.params.id,
        title: 'Notice title',
        caption: 'Caption...',
        textarea: null,
        uri: null,
    }
)


onMounted(
    () => {
        changeStatusLoading(true)
        noticeShowAction(route.params.id)
            .then(
                (res) => {
                    if (res.data.data) {
                        let data = res.data.data;
                        notice.title = data.title
                        notice.caption = data.caption
                        notice.textarea = data.textarea
                        notice.uri = data.uri
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


watch(
    notice,
    debounce(
        () => {
            changeStatusLoading(true)
            noticeSaveAction(notice)
                .then(
                    (res) => {
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
        , 1600
    )
)

const publishNotice = () => {
    changeStatusLoading(true)
    noticePublishAction(notice.id)
        .then(
            (res) => {
                toast(res.data.messages, {
                    "type": res.data.status ? "success" : "error",
                    "dangerouslyHTMLString": true
                })
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

const copyUrl = () => {
    navigator.clipboard.writeText(window.location.origin + '/notice/' + notice.uri);
    toast("URL Copied Successfully", {
        "type": "success",
        "dangerouslyHTMLString": true
    })
}

const goTourl = () => {
    window.open('/notice/' + notice.uri, '_blank');
}
</script>

<template>
    <div class=" max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Notice</h1>

        <div class="mt-10 bg-white border rounded-lg p-10 pb-0">
            <div class="flex justify-between items-center pb-10 gap-8">
                <div class="grow">
                    <input type="text" class="text-[20px] font-semibold outline-none w-full" v-model="notice.title">
                    <input type="text" class="text-gray-400 text-sm outline-none w-full" v-model="notice.caption">
                </div>
                <div class="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="max-w-4 w-full cursor-pointer" viewBox="0 0 448 512"
                        @click="copyUrl">
                        <path
                            d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="max-w-4 w-full cursor-pointer" viewBox="0 0 512 512" @click="goTourl">
                        <path
                            d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                    </svg>

                    <Btn class="text-sm py-1 px-2 rounded-md bg-primary text-white" @click="publishNotice">Publish</Btn>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <Editor api-key="8afgkporm5trjupp6iv6eoa6hdyqyd8eeb7qdtydlvs9hulg" v-model="notice.textarea"
                :init="editorInit" />
        </div>
    </div>
</template>