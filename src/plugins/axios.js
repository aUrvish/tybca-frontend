import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth'
import { useRoute } from 'vue-router'
import service from './service'


const customAxios = axios.create({
    baseURL: service.apiBaseUrl,
    headers : {
        'Accept': 'application/json'
    }
});
const requestHandler = request => {
    const { auth } = storeToRefs(useAuthStore());
    let idToken = auth?.value?.token;
    request.headers.Authorization = 'Bearer '+idToken;  
    return request;
};
const responseHandler = response => {
    const { authNull } = useAuthStore();
    if(response.status==401){
        authNull()
    }
   return response;
};

const errorHandler = error => {
    const { authNull } = useAuthStore();
    if(error.response && error.response.status==401){
        authNull()
    }
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );


export default customAxios;