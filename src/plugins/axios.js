import axios from 'axios';
// import store from '../state/store'
const customAxios = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers : {
        'Accept': 'application/json'
    }
});
// const requestHandler = request => {
//     let idToken = store.state.auth.idToken;
//     request.headers.Authorization = 'Bearer '+idToken;  
//     return request;
// };
// const responseHandler = response => {
//     if(response.status==401){
//        store.dispatch('auth/logout')
//     }
//    return response;
// };

// const errorHandler = error => {
//     if(error.response && error.response.status==401){
//        store.dispatch('auth/logout')
//     }
//     return Promise.reject(error);
// };

// customAxios.interceptors.request.use(
//     (request) => requestHandler(request),
//     (error) => errorHandler(error)
// );

// customAxios.interceptors.response.use(
//     (response) => responseHandler(response),
//     (error) => errorHandler(error)
//  );


export default customAxios;