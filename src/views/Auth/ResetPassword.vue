<script setup >
import Auth from '@/layouts/auth.vue'
import Textbox from '@/components/Textbox.vue'
import Btn from '@/components/Btn.vue'
import { ref, computed } from 'vue';
import { toast } from "vue3-toastify";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { useRoute, useRouter } from 'vue-router';
const { resetPassword } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
import { storeToRefs } from 'pinia';
const { isLoading } = storeToRefs(useLoadStore());

const route = useRoute()
const router = useRouter()

const user = ref(
    {
        password: null,
        cpassword: null,
    }
)

const rules = computed(() => {
    return {
        password: { required, minLength: minLength(8) },
        cpassword: { required, sameAs: sameAs(user.value.password) }
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
        password: user.value.password,
        password_confirmation: user.value.cpassword,
    }
    resetPassword(payload, route.params.token)
        .then(
            (res) => {
                toast(res.data.messages, {
                    "type": res.data.status ? "success" : "error",
                    "dangerouslyHTMLString": true
                })
                changeStatusLoading(false)
                router.push({ name: 'Login' })
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
                Reset Password
            </h1>
            <p class="text-sm text-gray-400 font-medium">set your password</p>
            <form @submit.prevent="submitForLogin">
                <div class="my-5">
                    <Textbox id="password" label="New Password" name="password" v-model="user.password"
                        placeholder="••••••••" type="password" />
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.password.required.$invalid">
                        <span class="font-bold text-base">!</span> Password is required
                    </div>
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.password.minLength.$invalid">
                        <span class="font-bold text-base">!</span> The password should be at least 8 characters long
                    </div>
                </div>
                <div class="my-5">
                    <Textbox id="cpassword" label="Confirm Password" name="cpassword" v-model="user.cpassword"
                        placeholder="••••••••" type="password" />
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.cpassword.required.$invalid">
                        <span class="font-bold text-base">!</span> Confirm password is required
                    </div>
                    <div class="text-red-400 mt-1 text-sm font-medium"
                        v-if="v$.$dirty && v$.cpassword.sameAs.$invalid && !v$.cpassword.required.$invalid">
                        <span class="font-bold text-base">!</span> The Password confirmation does not match
                    </div>
                </div>

                <div class="mt-7">
                    <Btn type="submit"
                        class="w-full text-white flex justify-center items-center gap-3 font-medium rounded-md text-sm px-5 py-2.5 text-center"
                        :class="isLoading ? 'bg-gray-700' : 'bg-gray-950'" :disabled="isLoading">
                        Reset Password
                        <svg aria-hidden="true" v-if="isLoading" class="w-5 h-5 text-white animate-spin fill-gray-950"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                    </Btn>
                </div>

                <RouterLink :to="{ name: 'Login' }" class="flex justify-center items-center gap-2 mt-5 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 fill-current">
                        <path
                            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
                    </svg>
                    <p class="font-medium">Back to LogIn</p>
                </RouterLink>
            </form>
        </div>
    </Auth>
</template>