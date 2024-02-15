<script setup >
import Editor from '@tinymce/tinymce-vue'
import { ref } from 'vue'
const editorInit = ref(
    {
        toolbar_mode: 'sliding',
        plugins: 'tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
        ],
        draggable_modal: true
    })

    const noticeTitle = ref('Notice title')
</script>

<template>
    <div class=" max-w-screen-xl mx-auto">
        <h1 class="text-[24px] font-semibold">Notice</h1>

        <div class="mt-10 bg-white border rounded-lg p-10 pb-0">
            <div class="flex justify-between items-center pb-10 gap-8">
                <div class="grow">
                    <input type="text" class="text-[20px] font-semibold outline-none w-full" v-model="noticeTitle">
                    <p class="text-gray-400 text-sm">Created at <span class="font-semibold">22 Jan 2024</span> </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="max-w-4 cursor-pointer" viewBox="0 0 512 512">
                    <path
                        d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
            </div>
        </div>

        <div class="mt-4" >
            <Editor api-key="6yuuk2g8w4cqrix07s089m8vvx20u3b7a5ntg3fj7kz5rr24" :init="editorInit" />
        </div>
    </div>
</template>