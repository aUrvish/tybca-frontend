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
        password: { required, minLength : minLength(8) },
        cpassword: { required, sameAs : sameAs(user.value.password) }
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
                router.push({name : 'Login'})
            }
        )
        .catch(
            (e) => {
                toast(e.message, {
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
                    <Textbox id="password" label="New Password" name="password" v-model="user.password" placeholder="••••••••"
                        type="password" />
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.password.required.$invalid">
                        <span class="font-bold text-base">!</span> Password is required
                    </div>
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.password.minLength.$invalid">
                        <span class="font-bold text-base">!</span> The password should be at least 8 characters long
                    </div>
                </div>
                <div class="my-5">
                    <Textbox id="cpassword" label="Confirm Password" name="cpassword" v-model="user.cpassword" placeholder="••••••••"
                        type="password" />
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.cpassword.required.$invalid">
                        <span class="font-bold text-base">!</span> Confirm password is required
                    </div>
                    <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.cpassword.sameAs.$invalid && !v$.cpassword.required.$invalid">
                        <span class="font-bold text-base">!</span> The Password confirmation does not match
                    </div>
                </div>

                <div class="mt-7">
                    <Btn type="submit"
                        class="w-full text-white bg-gray-950 font-medium rounded-md text-sm px-5 py-2.5 text-center">
                        Reset Password
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