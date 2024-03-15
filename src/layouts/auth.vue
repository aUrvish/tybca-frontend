<script setup >
import AuthNav from '@/components/AuthNav.vue'
</script>

<template>
  <AuthNav>
    <slot name="navlink" />
  </AuthNav>
  <div class="grid lg:grid-cols-2 h-full -mt-1" >
    <div class="web-info bg-center flex items-center flex-col justify-center">
      <div class="py-40 px-4" >
        <img src="../assets/svgs/logo-light.svg" alt="Logo">
        <h1 class="text-white font-semibold md:text-[42px] text-[28px] my-1" >Welcome to Ventures</h1>
        <p class="max-w-screen-md mmd:text-xl text-base text-white" >Ventures happy to see you here.
          Please sign in to system to explore your personal details, Operations management and Many more!!!</p>
      </div>
    </div>
    <div class="grow py-20 grid place-items-center px-4">
        <slot />
    </div> 
  </div>
</template>

<style scoped >
.web-info {
  background:  linear-gradient(#083149b3 , #083149b3), url('@/assets/images/auth-bg.jpeg');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
}
</style>