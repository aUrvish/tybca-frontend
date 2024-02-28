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
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const { loginAction } = useAuthStore();
const { changeStatusLoading } = useLoadStore();
const { isLoading } = storeToRefs(useLoadStore());
const router = useRouter()

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
          <RouterLink :to="{ name : 'RequestPassword' }" class="text-sm font-medium hover:underline">Forgot password?</RouterLink>
        </div>


        <div class="mt-7">
          <Btn type="submit" class="w-full text-white bg-gray-950 font-medium rounded-md text-sm px-5 py-2.5 text-center">
            Sign In
          </Btn>
        </div>
      </form>
    </div>
  </Auth>
</template>