<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useLoadStore } from '@/store/loading'

const { auth } = storeToRefs(useAuthStore());
const { isLoading } = storeToRefs(useLoadStore());
const router = useRouter()

router.beforeEach(async (to, from, next) => {
  const currentUserRoleID = await auth.value?.user.role_id
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const { path, name, params } = to
  if (auth.value && requiresAuth && ["Login", "RequestPassword"].includes(name)) {
    return next("/")
  }else if (requiresAuth && auth.value && !to.meta.role_id.includes(currentUserRoleID)) {
    return next(from.path)
  } else if (requiresAuth && !auth.value) {
    return next("/login")
  }
  return next()
})

</script>

<template>
  <div class="z-[100] sticky top-0" :class="isLoading ? '' : 'invisible'">
    <div class='h-1 w-full bg-gray-200 overflow-hidden'>
      <div class='progress w-full h-full bg-gray-600 left-right'></div>
    </div>
  </div>
  <RouterView />
</template>
