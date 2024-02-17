<script setup >
import Auth from '@/layouts/auth.vue'
import Textbox from '@/components/Textbox.vue'
import Btn from '@/components/Btn.vue'
</script>
<style>
  .or-text{
    /* width: 100%;
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    border: none;
    font-size: 15px;
    font-weight: 300;
    margin: 0;
    padding: 24px 0 0; */
  }
  .or-text::before{
    content: "";
    border-bottom: 1px solid #c2c8d0;
    flex: 1 0 auto;
    height: 0.5rem;
    margin: 0;
  }
  .or-text::after{
    content: "";
    border-bottom: 1px solid #c2c8d0;
    flex: 1 0 auto;
    height: 0.5rem;
    margin: 0;
  }
  .or-text span{
    text-align: center;
    flex: 0.2 0 auto;
    margin: 0;
  }
</style>
<template>
  <Auth>
    <div class="rounded-lg border-2 p-6 max-w-[400px] w-full">
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        Create an account
      </h1>

      <form @submit.prevent>
        <div class="my-5">
          <Textbox id="loginName" label="Name" name="name" placeholder="Jeff Bazos" type="text" />
        </div>
        <div class="my-5">
          <Textbox id="loginEmail" label="Email" name="email" placeholder="name@example.com" type="email" />
        </div>
        <div class="my-5">
          <Textbox id="mobileNum" label="Phone Number" name="Pnumber" placeholder="1234567899" type="email" />
        </div>
        <div class="my-5">
          <Textbox id="loginPassword" label="Password" name="password" placeholder="••••••••" type="password" /> 
        </div>
        <div class="my-5">
          <Textbox id="loginConfirmPassword" label="Confirm Password" name="Confirm password" placeholder="••••••••" type="password" /> 
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
          <RouterLink to="#" class="text-sm font-medium hover:underline">Forgot password?</RouterLink>
        </div>


        <div class="mt-7">
          <Btn type="submit" class="w-full text-white bg-gray-950 font-medium rounded-md text-sm px-5 py-2.5 text-center">
            Sign Up
          </Btn>
          <div class="or-text w-full flex flex-row uppercase text-[15px] font-light m-0 pt-6 pb-0 px-0 border-[none]">
            <span>or</span>
          </div>
          <Btn type="signin" class="mt-5 w-full text-gray-950 font-medium rounded-md text-sm sm:px-5 px-2 py-2.5 flex relative justify-center items-center cursor-pointer bg-[#e9eaf2] gap-2 text-left">
           <img src="/src/assets/svgs/google_logo.svg" alt="" srcset="" width="20px" height="20px">
           Signup with Google
          </Btn> 
        </div>
      </form>
    </div>
  </Auth>
</template>