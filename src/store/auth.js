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

        const registerAction = async(payload) => {
            let res = null;
            res = axios.post('/api/auth/add', payload);
            return res
        }

        const profilesEditAction = async(payload) => {
            let res = null;
            res = axios.post('/api/profiles-edit', payload);
            return res
        }

        const authProfilesEditAction = async(payload) => {
            let res = null;
            res = axios.post('/api/auth-profiles-edit', payload);
            return res
        }

        const getProfilesAction = async(id) => {
            let res = null;
            res = axios.get(`/api/profile/${id}`);
            return res
        }

        const getAuthProfileAction = async() => {
            let res = null;
            res = axios.get('/api/profile');
            return res
        }

        return {
            auth, 
            loginAction, 
            requestResetAction, 
            logoutAction, 
            authNull, 
            resetPassword, 
            changePassword, 
            registerAction, 
            profilesEditAction,
            getProfilesAction,
            getAuthProfileAction,
            authProfilesEditAction
        }
    },
    {
        persist : true
    }
)