import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/plugins/axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', 
    () => {
        const auth = ref(null)
        const router = useRouter();

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

        const logoutAction = async () => {
            let res = null;
            res= axios.get('/api/auth/logout');
            return res
        }

        const authNull = () => {
            auth.value = null
            router.push({name : 'Login'})
        }

        const resetPassword = async (payload, token) => {
            let res = null;
            res = axios.post(`/api/auth/reset-password/${token}`, payload);
            return res
        }

        const changePassword = async (payload) => {
            let res = null;
            res = axios.post('/api/auth/change-password', payload);
            return res
        }

        return {auth, loginAction, requestResetAction, logoutAction, authNull, resetPassword, changePassword}
    },
    {
        persist : true
    }
)