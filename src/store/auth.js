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

        const getStudentsAction = async(page = 1) => {
            let res = null;
            res = axios.get(`/api/auth/students/get/?page=${page}`);
            return res
        }

        const getTeachersAction = async() => {
            let res = null;
            res = axios.get('/api/auth/teachers/get');
            return res
        }

        const getStaffAction = async() => {
            let res = null;
            res = axios.get('/api/auth/staff/get');
            return res
        }

        const removeAction = async(id) => {
            let res = null;
            res = axios.get(`/api/auth/remove/${id}`);
            return res
        }

        const disableAction = async(payload) => {
            let res = null;
            res = axios.post('/api/auth/disable', payload);
            return res
        }

        const getTeachersSeacherAction = async(payload) => {
            let res = null;
            res = axios.post('/api/auth/teachers/search', payload);
            return res
        }

        const getStaffSeacherAction = async(payload) => {
            let res = null;
            res = axios.post('/api/auth/staff/search', payload);
            return res
        }

        const getStudentsSeacherAction = async(payload) => {
            let res = null;
            res = axios.post('/api/auth/students/search', payload);
            return res
        }

        const getOverviewAction = async() => {
            let res = null;
            res = axios.get('/api/overview/get');
            return res
        }

        const getOverviewStudentsAction = async() => {
            let res = null;
            res = axios.get('/api/overview/students');
            return res
        }

        const getOverviewTeachersAction = async() => {
            let res = null;
            res = axios.get('/api/overview/teachers');
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
            authProfilesEditAction,
            getStudentsAction,
            getTeachersAction,
            getTeachersSeacherAction,
            getStudentsSeacherAction,
            removeAction,
            disableAction,
            getOverviewAction,
            getOverviewStudentsAction,
            getOverviewTeachersAction,
            getStaffAction,
            getStaffSeacherAction
        }
    },
    {
        persist : true
    }
)