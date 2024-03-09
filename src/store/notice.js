import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/plugins/axios'

export const useNoticeStore = defineStore('notice', 
    () => {
        const lastCheckout = ref(null)

        const noticeSaveAction = async (payload) => {
            let res = null;
            res = axios.post('/api/notice/save', payload);
            return res
        }

        const noticeRemoveAction = async (id) => {
            let res = null;
            res = axios.get(`/api/notice/delete/${id}`);
            return res
        }

        const noticeGetAction = async (uri) => {
            let res = null;
            res = axios.get(`/api/notice/${uri}`);
            return res
        }

        const noticeShowAction = async (id) => {
            let res = null;
            res = axios.get(`/api/notice/get/${id}`);
            return res
        }

        const noticeGetAllAction = async () => {
            let res = null;
            res = axios.get('/api/notice/all');
            return res
        }

        const noticeChangeStatusAction = async (payload) => {
            let res = null;
            res = axios.post('/api/notice/change-status', payload);
            return res
        }

        const noticePublishAction = async (id) => {
            let res = null;
            res = axios.get(`/api/notice/publish/${id}`);
            return res
        }

        const getNoticeSeacherAction = async(payload) => {
            let res = null;
            res = axios.post('/api/notice/search', payload);
            return res
        }

        return {
            lastCheckout,
            noticeSaveAction,
            noticeRemoveAction,
            noticeChangeStatusAction,
            noticePublishAction,
            noticeGetAction,
            noticeShowAction,
            noticeGetAllAction,
            getNoticeSeacherAction
        }
    },
    {
        persist : true
    }
)