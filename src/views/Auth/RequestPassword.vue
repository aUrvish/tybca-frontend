<script setup >
import Auth from '@/layouts/auth.vue'
import Textbox from '@/components/Textbox.vue'
import Btn from '@/components/Btn.vue'
import { ref, computed } from 'vue';
import { toast } from "vue3-toastify";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const { requestResetAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();

const user = ref(
    {
        email : null
    }
)

const rules = computed(() => {
    return {
        email : {required , email}
    }
})

const v$ = useVuelidate(rules, user)

const submitForLogin = () => {
    v$.value.$validate();
    if (v$.value.$invalid) {
        return null
    }

    changeStatusLoading(true)

    let payload = {
        email: user.value.email,
    }
    requestResetAction(payload)
        .then(
            (res) => {
                console.log(res);
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

</script>

<template>
    <Auth>
        <div class="rounded-lg border-2 p-6 max-w-[400px] w-full">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Forgot Password?
            </h1>
            <p class="text-sm text-gray-400 font-medium">No worries, we'll send you reset-insrtuction</p>
            <form @submit.prevent="submitForLogin">
                <div class="my-5">
                    <Textbox id="Email" label="Email" name="email" v-model="user.email" placeholder="jonedeo@example.com"
                        type="email" />
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.email.required.$invalid">
                        <span class="font-bold text-base">!</span> Email is required
                    </div>
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.email.email.$invalid">
                        <span class="font-bold text-base">!</span> Please enter valid email address
                    </div>
                </div>

                <div class="mt-7">
                    <Btn type="submit"
                        class="w-full text-white bg-gray-950 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Send Mail
                    </Btn>
                </div>

                <RouterLink :to="{name : 'Login'}" class="flex justify-center items-center gap-2 mt-5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 fill-current">
                        <path
                            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                    </svg>
                    <p class="font-medium" >Back to LogIn</p>
                </RouterLink>
            </form>
    </div>
</Auth></template>