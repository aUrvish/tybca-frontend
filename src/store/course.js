import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from '@/plugins/axios'

export const useCourseStore = defineStore('course', 
    () => {
        const course = ref([])

        const addCourse = async (payload) => {
            let res = null;
            res = axios.post('/api/course/add', payload);
            return res
        }

        const removeCourse = async (id) => {
            let res = null;
            res = axios.get(`/api/course/remove/${id}`);
            return res
        }

        const getCourse = async () => {
            let res = null;
            res = axios.get('/api/course/get');
            return res
        }

        const mutationRemoveCourse = (id) => {
            course.value = course.value.filter((curr, index) => curr.id != id)
        }

        const mutationSetCourse = (course_arr) => {
            course.value = course_arr
        }

        return {course, addCourse, removeCourse, getCourse, mutationRemoveCourse, mutationSetCourse}
    }
)