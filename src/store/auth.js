import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/plugins/axios'

export const useAuthStore = defineStore('auth', 
    () => {
        const auth = ref(null)

        const loginAction = async (payload) => {
            let res = null;
            res = axios.post('/api/auth/login', payload);
            auth.value = (await res).data.data;
            return res
        }

        const requestResetAction = async (payload) => {
            let res = null;
            res = axios.post('/api/auth/request-reset-password', payload);
            return res
        }

        const logoutAction = () => {
            auth.value = null;
        }

        return {auth, loginAction, requestResetAction, logoutAction}
    },
    {
        persist : true
    }
)