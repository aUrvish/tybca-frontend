import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/plugins/axios'

export const useQuizStore = defineStore('quiz', 
    () => {

        const addQuizAction = async (payload) => {
            let res = null;
            res = axios.post('/api/quiz/save', payload);
            return res
        }

        const addQuestionAction = async (payload) => {
            let res = null;
            res = axios.post('/api/quiz/question/save', payload);
            return res
        }
        
        const addQuestionInputAction = async (payload) => {
            let res = null;
            res = axios.post('/api/quiz/question-input/save', payload);
            return res
        }

        const removeQuizAction = async (id) => {
            let res = null;
            res = axios.get(`/api/quiz/remove/${id}`);
            return res
        }

        const removeQuestionAction = async (id) => {
            let res = null;
            res = axios.get(`/api/quiz/question/remove/${id}`);
            return res
        }

        const removeQuestionInputAction = async (id) => {
            let res = null;
            res = axios.get(`/api/quiz/question-input/remove/${id}`);
            return res
        }

        const getAction = async (id) => {
            let res = null;
            res = axios.get(`/api/quiz/get/${id}`);
            return res
        }

        const getFetchAction = async (uri) => {
            let res = null;
            res = axios.get(`/api/quiz/fetch/${uri}`);
            return res
        }

        const getAllAction = async (page = 1) => {
            let res = null;
            res = axios.get(`/api/quiz/get?page=${page}`);
            return res
        }

        const getAllSeacherAction = async(payload) => {
            let res = null;
            res = axios.post('/api/quiz/search', payload);
            return res
        }

        return {addQuizAction, addQuestionAction, addQuestionInputAction, removeQuizAction, removeQuestionAction, removeQuestionInputAction, getAction, getAllAction, getAllSeacherAction, getFetchAction}
    }
)