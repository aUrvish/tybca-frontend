<script setup>
import { ref, onMounted } from 'vue';
import { toPng } from 'html-to-image';

const frame = ref(null)

// onMounted(
//     () => {
//         console.log(frame);
//     }
// )

const props = defineProps(
    {
        type: {
            default: 'certificate'
        },
        data : {
            require : true,
        }
    }
)

const emit = defineEmits(['loadImg'])

const resultEle = ref(null)
const imageUrl = ref(null)
const origin = ref(null)

// const resultHtml = ref(`
//     <div> <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);" border="1"><colgroup><col style="width: 99.9196%;"></colgroup> <tbody> <tr> <td style="text-align: center;"><span style="font-size: 16px;"><strong>Result</strong></span></td> </tr> </tbody> </table> <p style="text-align: center;  margin: 2px;"><span style="font-size: 14px;"><strong>Ventures - Examination 2024-25</strong></span></p> <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);" border="1"><colgroup><col style="width: 100%;"></colgroup> <tbody> <tr> <td><span style="font-size: 12px;"><strong>CANDIDATE DETAILS</strong></span></td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%; height: 111.953px;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup> <tbody> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;"  >Candidate ID</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>280028</strong></td> </tr> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;" >Candidate Name</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>Jone Deo</strong></td> </tr> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;" >Candidate Email</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>jone@example.com</strong></td> </tr> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;" >Candidate Mobile No.</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>9797899788</strong></td> </tr> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;" >Candidate Address</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>Surat, India</strong></td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217); margin-top: 8px;" border="1"><colgroup><col style="width: 100%;"></colgroup> <tbody> <tr> <td><span style="font-size: 12px;"><strong>MARKS DETAILS</strong></span></td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 40.0644%;"><col style="width: 19.9517%;"><col style="width: 19.9517%;"><col style="width: 19.9517%;"></colgroup> <tbody> <tr> <td  style="text-align: left; font-size: 10px;"><strong>SUBJECT</strong></td> <td  style="text-align: center; font-size: 10px;"><strong>THEROY</strong></td> <td  style="text-align: center; font-size: 10px;"><strong>GRADE</strong></td> <td  style="text-align: center; font-size: 10px;"><strong>TOTAL</strong></td> </tr> <tr> <td  style="text-align: left; font-size: 10px;">Data Science</td> <td  style="text-align: center; font-size: 10px;">90</td> <td  style="text-align: center; font-size: 10px;">A+</td> <td  style="text-align: center; font-size: 10px;">100</td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup> <tbody> <tr> <td style="font-size: 10px;" ><strong>Percentage</strong></td> <td  style="text-align: right; font-size: 10px;"><strong>90%</strong></td> </tr> <tr> <td  style="font-size: 10px;"><strong>Result</strong></td> <td  style="text-align: right; font-size: 10px;"><strong>PASS</strong></td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217); margin-top: 8px;" border="1"><colgroup><col style="width: 100%;"></colgroup> <tbody> <tr> <td><span style="font-size: 12px;"><strong>DISCLAIMER</strong></span></td> </tr> </tbody> </table> <ul> <li style="font-size: 10px;"> This is a Computer Genrated provisional Score Card.</li> <li style="font-size: 10px;"> Data provided by ventures.</li> <li  style="font-size: 10px;"> In case of any clarification, please contact result hosting team.</li> </ul> </div>    
// `);

onMounted(
    () => {
        origin.value = window.location.origin
        resultEle.value.classList.remove('hidden')
        toPng(resultEle.value)
            .then(
                (dataUrl) => {
                    imageUrl.value = dataUrl;
                    emit('loadImg');
                }
            ).finally(
                () => {
                    resultEle.value.classList.add('hidden')
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
    <!-- <iframe ref="frame" class="w-full aspect-[3/4] border bg-gray-100 rounded-lg cursor-pointer select-none" scrolling="no" seamless="seamless" :srcdoc="resultHtml" ></iframe> -->

    <div class="border relative overflow-hidden" v-if="type == 'certificate'">
        <img :src="imageUrl" v-if="imageUrl" alt="certificate">
        <div class="h-full container mx-auto grid place-items-center max-w-screen-sm min-w-[640px] animate-pulse hidden"
            ref="resultEle"> <!-- certificate -->
            <div class="border relative max-w-screen-lg w-full aspect-[5/3.5] bg-[length:100%_100%] bg-no-repeat"
                style="background-image: url('./src/assets/images/certi1.png');">
                <p style='font-family: Lato'
                    class="uppercase text-[36px] font-medium text-center absolute w-full top-[16%]"> Certificate</p>
                <p style='font-family: Lato' class="text-[22px] text-center absolute w-full top-[26%]"> Of Appreciation
                </p>
                <p style='font-family: Lato' class="text-[16px] text-center absolute w-full top-[34%]"> This certificate
                    is presented to</p>
                <p class="text-[36px] text-center absolute w-full top-[42%] capitalize">{{ data.user.name }}</p>
                <p style='font-family: Lato' class="text-[14px] text-center absolute w-full top-[54%] max-w-md left-1/2 -translate-x-1/2"> This certificate is given to {{ data.user.name }} for his achievement in the field of education and proves that he is great success in <span class="uppercase" > {{ data.course.name }} </span>.</p>
                <div class="container">
                    <div class="grid grid-cols-3 absolute w-full top-[68%] mx-5">
                        <div class="max-w-sm overflow-hidden ms-5 text-center"> </div>
                        <div> <div class="aspect-squre w-14 mx-auto bg-[length:100%_100%] aspect-square bg-no-repeat" style="background-image: url('./src/assets/images/stamp1.webp');"></div> </div>
                        <div class="max-w-sm overflow-hidden ms-5 text-center"> 
                            <div class="w-[80px] aspect-video ml-8 mx-auto bg-[length:100%_100%] bg-no-repeat" :style="{backgroundImage: `url('${data.quiz.certi_signature}'` }"> </div>
                            <p class="font-medium text-[12px] text-center mt-1 me-20 ">Tom cruise</p>
                            <p class=" text-[12px] text-center me-20 uppercase">REPRESENTATIVES</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="border relative overflow-hidden" v-else>
        <img :src="imageUrl" v-if="imageUrl" alt="result">
        <div class="p-4 space-y-4 bg-gray-100 animate-pulse min-w-[700px]" ref="resultEle" >


        <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);"
            border="1">
            <colgroup>
                <col style="width: 99.9196%;">
            </colgroup>
            <tbody>
                <tr>
                    <td style="text-align: center;"><span style="font-size: 24pt;"><strong>Result</strong></span>
                    </td>
                </tr>
            </tbody>
        </table>
        <p style="text-align: center;"><span style="font-size: 18pt;"><strong>Ventures - {{ data.quiz.title }}</strong></span></p>
        <p style="text-align: center;">&nbsp;</p>
        <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);"
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
                    <td style="height: 22.3906px;"><strong v-if="data.user && data.user.id">{{ data.user.id }}</strong></td>
                </tr>
                <tr style="height: 22.3906px;">
                    <td style="height: 22.3906px;">Candidate Name</td>
                    <td style="height: 22.3906px;"><strong class="capitalize" v-if="data.user && data.user.name" >{{ data.user.name }}</strong></td>
                </tr>
                <tr style="height: 22.3906px;">
                    <td style="height: 22.3906px;">Candidate Email</td>
                    <td style="height: 22.3906px;"><strong v-if="data.user && data.user.email">{{ data.user.email }}</strong></td>
                </tr>
                <tr style="height: 22.3906px;">
                    <td style="height: 22.3906px;">Candidate Mobile No.</td>
                    <td style="height: 22.3906px;"><strong v-if="data.user && data.user.mobile">{{ data.user.mobile }}</strong></td>
                </tr>
                <tr style="height: 22.3906px;">
                    <td style="height: 22.3906px;">Candidate Address</td>
                    <td style="height: 22.3906px;"><strong class="capitalize" v-if="data.user && data.user.country" >{{ data.user.city }}, {{ data.user.country }}</strong></td>
                </tr>
            </tbody>
        </table>
        <p style="text-align: left;">&nbsp;</p>
        <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);"
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
                    <td style="text-align: left;">{{ data.course.name }}</td>
                    <td style="text-align: right;">{{ data.score }}</td>
                    <td style="text-align: right;">{{ data.max ? setGrade((data.score * 100 / data.max)) : '-'  }}</td>
                    <td style="text-align: right;">{{ data.max }}</td>
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
                    <td style="text-align: right;"><strong>{{(data.score * 100 / data.max) || 0}}%</strong></td>
                </tr>
                <tr>
                    <td><strong>Result</strong></td>
                    <td style="text-align: right;"><strong>{{(data.score * 100 / data.max) > 34 ? 'PASS' : 'FAIL' }}</strong></td>
                </tr>
            </tbody>
        </table>
        <p>&nbsp;</p>
        <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);"
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
</template>