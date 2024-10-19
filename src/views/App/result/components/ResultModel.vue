<script setup>
import { toPng } from 'html-to-image';
import { ref, onMounted } from 'vue'
const resultEle = ref(null);
const downloadUrl = ref(null)

const props = defineProps({
    responce : {
        default : {},
    }
})

onMounted(
    () => {
        toPng(resultEle.value)
            .then(
                (dataUrl) => {
                    downloadUrl.value = dataUrl;
                }
            )
    }
)

const setGrade = (per) => {
    if (per > 90) {
        return 'A';
    }else if (per > 80 && per < 90) {
        return 'B';
    }else if (per > 70 && per < 80) {
        return 'C';
    }else if (per > 55 && per < 70) {
        return 'D';
    }else {
        return 'E'
    }
}
</script>

<template>
    <div
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full bg-[#00000080]">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-screen-md h-auto">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow ">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 class="text-xl font-semibold text-gray-900 ">
                        Responce
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                        @click="$emit('close')" data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="max-h-96  overflow-auto">
                    <div class="p-4 md:p-5 space-y-4 min-w-[600px] bg-white" ref="resultEle">
                        <table
                            style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);"
                            border="1">
                            <colgroup>
                                <col style="width: 99.9196%;">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td style="text-align: center;"><span
                                            style="font-size: 24pt;"><strong>Result</strong></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p style="text-align: center;"><span style="font-size: 18pt;"><strong>Ventures - {{ responce.quiz.title }}</strong></span></p>
                        <p style="text-align: center;">&nbsp;</p>
                        <table
                            style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);"
                            border="1">
                            <colgroup>
                                <col style="width: 100%;">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td><span style="font-size: 14pt;"><strong>CANDIDATE DETAILS</strong></span></td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="border-collapse: collapse; width: 100%; height: 111.953px;" border="1">
                            <colgroup>
                                <col style="width: 50%;">
                                <col style="width: 50%;">
                            </colgroup>
                            <tbody>
                                <tr style="height: 22.3906px;">
                                    <td style="height: 22.3906px;">Candidate ID</td>
                                    <td style="height: 22.3906px;"><strong v-if="responce.user && responce.user.id">{{
                            responce.user.id }}</strong></td>
                                </tr>
                                <tr style="height: 22.3906px;">
                                    <td style="height: 22.3906px;">Candidate Name</td>
                                    <td style="height: 22.3906px;"><strong class="capitalize"
                                            v-if="responce.user && responce.user.name">{{ responce.user.name }}</strong></td>
                                </tr>
                                <tr style="height: 22.3906px;">
                                    <td style="height: 22.3906px;">Candidate Email</td>
                                    <td style="height: 22.3906px;"><strong v-if="responce.user && responce.user.email">{{
                            responce.user.email }}</strong></td>
                                </tr>
                                <tr style="height: 22.3906px;">
                                    <td style="height: 22.3906px;">Candidate Mobile No.</td>
                                    <td style="height: 22.3906px;"><strong v-if="responce.user && responce.user.mobile">{{
                            responce.user.mobile }}</strong></td>
                                </tr>
                                <tr style="height: 22.3906px;">
                                    <td style="height: 22.3906px;">Candidate Address</td>
                                    <td style="height: 22.3906px;"><strong class="capitalize"
                                            v-if="responce.user && responce.user.country">{{ responce.user.city }}, {{
                                            responce.user.country }}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <p style="text-align: left;">&nbsp;</p>
                        <table
                            style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);"
                            border="1">
                            <colgroup>
                                <col style="width: 100%;">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td><span style="font-size: 14pt;"><strong>MARKS DETAILS</strong></span></td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="border-collapse: collapse; width: 100%;" border="1">
                            <colgroup>
                                <col style="width: 40.0644%;">
                                <col style="width: 19.9517%;">
                                <col style="width: 19.9517%;">
                                <col style="width: 19.9517%;">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td style="text-align: left;"><strong>SUBJECT</strong></td>
                                    <td style="text-align: right;"><strong>THEROY</strong></td>
                                    <td style="text-align: right;"><strong>GRADE</strong></td>
                                    <td style="text-align: right;"><strong>TOTAL</strong></td>
                                </tr>
                                <tr>
                                    <td style="text-align: left;">{{ responce.course.name }}</td>
                                    <td style="text-align: right;">{{ responce.score }}</td>
                                    <td style="text-align: right;">{{ responce.max ? setGrade((responce.score * 100 / responce.max)) : '-'  }}</td>
                                    <td style="text-align: right;">{{ responce.max }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="border-collapse: collapse; width: 100%;" border="1">
                            <colgroup>
                                <col style="width: 50%;">
                                <col style="width: 50%;">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td><strong>Percentage</strong></td>
                                    <td style="text-align: right;"><strong>{{(responce.score * 100 / responce.max) || 0}}%</strong></td>
                                </tr>
                                <tr>
                                    <td><strong>Result</strong></td>
                                    <td style="text-align: right;"><strong>{{(responce.score * 100 / responce.max) > 34 ? 'PASS' : 'FAIL' }}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <p>&nbsp;</p>
                        <table
                            style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);"
                            border="1">
                            <colgroup>
                                <col style="width: 100%;">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td><span style="font-size: 14pt;"><strong>DISCLAIMER</strong></span></td>
                                </tr>
                            </tbody>
                        </table>
                        <ol>
                            <li>-This is a Computer Genrated provisional Score Card.</li>
                            <li>-Data provided by ventures.</li>
                            <li>-In case of any clarification, please contact result hosting team.</li>
                        </ol>

                    </div>
                </div>

                <!-- Modal footer -->
                <div class="flex items-center justify-between p-4 md:p-4 border-t border-gray-200 rounded-b ">
                    <button @click="$emit('close')" type="button"
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10">Close</button>
                    <a :href="downloadUrl" download
                        class="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-primary rounded-lg hover:text-blue-700 focus:z-10">Download</a>
                </div>
            </div>
        </div>
    </div>
</template>