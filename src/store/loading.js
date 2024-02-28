import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadStore = defineStore('loading', 
    () => {
        const isLoading = ref(false)

        const changeStatusLoading = (value) => {
            isLoading.value = value
        }

        return {isLoading, changeStatusLoading}
    }
)