<script setup >
import Auth from '@/layouts/auth.vue'
import Textbox from '@/components/Textbox.vue'
import Btn from '@/components/Btn.vue'
</script>

<template>
  <Auth>
    <div class="rounded-lg border-2 p-6 max-w-[400px] w-full">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Sign in to your account
      </h1>

      <form @submit.prevent>
        <div class="my-5">
          <Textbox id="loginEmail" label="Email" name="email" placeholder="name@example.com" type="email" />
        </div>
        <div class="my-5">
          <Textbox id="loginPassword" label="Password" name="password" placeholder="••••••••" type="password" /> 
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
          <RouterLink to="#" class="text-sm font-medium text-primary-600 hover:underline">Forgot password?</RouterLink>
        </div>


        <div class="mt-7">
          <Btn type="submit" class="w-full text-white bg-primary hover:bg-primary font-medium rounded-md text-sm px-5 py-2.5 text-center">
            Sign In
          </Btn>
        </div>
      </form>
    </div>
  </Auth>
</template>