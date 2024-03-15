<script setup >
import Auth from '@/layouts/auth.vue'
import Textbox from '@/components/Textbox.vue'
import Btn from '@/components/Btn.vue'
import { ref, computed } from 'vue';
import { toast } from "vue3-toastify";
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'
import { useRouter } from 'vue-router';
const { loginAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const router = useRouter()
import { storeToRefs } from 'pinia';
const { isLoading } = storeToRefs(useLoadStore());

const user = ref(
  {
    userId: null,
    password: null
  }
)

const rules = computed(() => {
  return {
    userId: { required },
    password: { required },
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
    username: user.value.userId,
    password: user.value.password
  }
  loginAction(payload)
    .then(
      (res) => {
        toast(res.data.messages, {
          "type": res.data.status ? "success" : "error",
          "dangerouslyHTMLString": true
        })

        if (res.data.status) {
          router.push('/');
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
  <Auth>
    <div class="rounded-lg border-2 p-6 max-w-[400px] shadow-md w-full">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Sign in to your account
      </h1>
      <p class="text-sm text-gray-400 font-medium">Think safety first</p>
      <form @submit.prevent="submitForLogin">
        <div class="my-5">
          <Textbox id="loginEmail" label="User ID" name="userid" v-model="user.userId" placeholder="jondeo" type="text" />
          <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.userId.$invalid">
            <span class="font-bold text-base">!</span> User id is required
          </div>
        </div>
        <div class="my-5">
          <Textbox id="loginPassword" label="Password" name="password" v-model="user.password" placeholder="••••••••"
            type="password" />
          <div class="text-red-400 mt-1 text-sm font-medium" v-if="v$.$dirty && v$.password.$invalid">
            <span class="font-bold text-base">!</span> Password is required
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4">
            </div>
            <div class="ml-1.5 text-sm">
              <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
            </div>
          </div>
          <RouterLink :to="{ name: 'RequestPassword' }" class="text-sm font-medium hover:underline">Forgot password?
          </RouterLink>
        </div>


        <div class="mt-7">
          <Btn type="submit" class="w-full flex justify-center items-center gap-3 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center" :class="isLoading ? 'bg-gray-700' : 'bg-gray-950'" :disabled="isLoading">
            Sign In
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
    </form>
  </div>
</Auth></template>