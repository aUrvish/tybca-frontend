<script setup>
import { ref, onMounted } from 'vue';
import { toPng } from 'html-to-image';

const frame = ref(null)

onMounted(
    () => {
        console.log(frame);
    }
)

const resultEle =ref(null)
const imageUrl =ref(null)

const resultHtml = ref(`
    <div> <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);" border="1"><colgroup><col style="width: 99.9196%;"></colgroup> <tbody> <tr> <td style="text-align: center;"><span style="font-size: 16px;"><strong>Result</strong></span></td> </tr> </tbody> </table> <p style="text-align: center;  margin: 2px;"><span style="font-size: 14px;"><strong>Ventures - Examination 2024-25</strong></span></p> <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217);" border="1"><colgroup><col style="width: 100%;"></colgroup> <tbody> <tr> <td><span style="font-size: 12px;"><strong>CANDIDATE DETAILS</strong></span></td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%; height: 111.953px;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup> <tbody> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;"  >Candidate ID</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>280028</strong></td> </tr> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;" >Candidate Name</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>Jone Deo</strong></td> </tr> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;" >Candidate Email</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>jone@example.com</strong></td> </tr> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;" >Candidate Mobile No.</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>9797899788</strong></td> </tr> <tr style="height: 22.3906px;"> <td style="height: 22.3906px; font-size: 10px;" >Candidate Address</td> <td style="height: 22.3906px; font-size: 10px;" ><strong>Surat, India</strong></td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217); margin-top: 8px;" border="1"><colgroup><col style="width: 100%;"></colgroup> <tbody> <tr> <td><span style="font-size: 12px;"><strong>MARKS DETAILS</strong></span></td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 40.0644%;"><col style="width: 19.9517%;"><col style="width: 19.9517%;"><col style="width: 19.9517%;"></colgroup> <tbody> <tr> <td  style="text-align: left; font-size: 10px;"><strong>SUBJECT</strong></td> <td  style="text-align: center; font-size: 10px;"><strong>THEROY</strong></td> <td  style="text-align: center; font-size: 10px;"><strong>GRADE</strong></td> <td  style="text-align: center; font-size: 10px;"><strong>TOTAL</strong></td> </tr> <tr> <td  style="text-align: left; font-size: 10px;">Data Science</td> <td  style="text-align: center; font-size: 10px;">90</td> <td  style="text-align: center; font-size: 10px;">A+</td> <td  style="text-align: center; font-size: 10px;">100</td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%;" border="1"><colgroup><col style="width: 50%;"><col style="width: 50%;"></colgroup> <tbody> <tr> <td style="font-size: 10px;" ><strong>Percentage</strong></td> <td  style="text-align: right; font-size: 10px;"><strong>90%</strong></td> </tr> <tr> <td  style="font-size: 10px;"><strong>Result</strong></td> <td  style="text-align: right; font-size: 10px;"><strong>PASS</strong></td> </tr> </tbody> </table> <table style="border-collapse: collapse; width: 100%; border-width: 1px; background-color: rgb(206, 212, 217); margin-top: 8px;" border="1"><colgroup><col style="width: 100%;"></colgroup> <tbody> <tr> <td><span style="font-size: 12px;"><strong>DISCLAIMER</strong></span></td> </tr> </tbody> </table> <ul> <li style="font-size: 10px;"> This is a Computer Genrated provisional Score Card.</li> <li style="font-size: 10px;"> Data provided by ventures.</li> <li  style="font-size: 10px;"> In case of any clarification, please contact result hosting team.</li> </ul> </div>    
`);

onMounted(
    () => {
        console.log(resultEle.value.classList.remove('hidden'))
        toPng(resultEle.value)
            .then(
                (dataUrl) => {
                    imageUrl.value = dataUrl;
                }
            ).finally(
                () => {
                    resultEle.value.classList.add('hidden')
                }
            )
    }
)
</script>
<template>
    <!-- <iframe ref="frame" class="w-full aspect-[3/4] border bg-gray-100 rounded-lg cursor-pointer select-none" scrolling="no" seamless="seamless" :srcdoc="resultHtml" ></iframe> -->

    <div class="border relative overflow-hidden" >
        <img :src="imageUrl" v-if="imageUrl" alt="certificate">
        <div class="h-full container mx-auto grid place-items-center max-w-screen-sm min-w-[640px] hidden" ref="resultEle"> <!-- certificate --> <div class="border relative max-w-screen-lg w-full aspect-[5/3.5] bg-[length:100%_100%] bg-no-repeat" style="background-image: url('./src/assets/images/certi1.png');"> <p style='font-family: Lato' class="uppercase text-[36px] font-medium text-center absolute w-full top-[16%]"> Certificate</p> <p style='font-family: Lato' class="text-[22px] text-center absolute w-full top-[26%]"> Of Appreciation</p> <p style='font-family: Lato' class="text-[16px] text-center absolute w-full top-[34%]"> This certificate is presented to</p> <p style='font-family: Great vibes ' class="text-[36px] text-center absolute w-full top-[42%] capitalize"> Benjamin Shah</p> <p style='font-family: Lato' class="text-[14px] text-center absolute w-full top-[54%]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br> tempor incididunt ut labore et dolore magna aliqua.</p> <div class="container"> <div class="grid grid-cols-3 absolute w-full top-[68%] mx-5"> <div class="max-w-sm overflow-hidden ms-5 text-center"> </div> <div class=""> <img src="@/assets/images/stamp1.webp" class="aspect-squre w-14 mx-auto" alt="stamp"> </div> <div class="max-w-sm overflow-hidden ms-5 text-center"> <img src="@/assets/images/sign2.png" class="aspect-squre mx-auto w-16" style="margin-left: 20%;" alt="sign"> <p class="font-medium text-[12px] text-center mt-1 me-20 ">Tom cruise</p> <p class=" text-[12px] text-center me-20 uppercase">REPRESENTATIVES</p> </div> </div> </div> </div> </div>
    </div>
</template>