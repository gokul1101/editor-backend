import { Redirect } from 'react-router'
import axios from 'axios'
const baseURL = "http://localhost:5000"

const helperService = {

    login : async (payload) => {
        const response =  (await axios.post(`${baseURL}/api/v1/login`,payload)).data
        if(response) return response
    },
    getUser : async (payload,config) => {
        console.log(payload)
        let url = `${baseURL}/api/v1/user/get`;
        if(payload.id)
            url += `?id=${payload.id}`;
        else if(payload.regno)
            url += `?regno=${payload.regno}`;
        const response = (await axios.get(url,config)).data
        if(response) return response
    }
}
export default helperService




    // checkPermission : () => {
    //     const currentPath = window.location.pathname
    //     const {role,token} = JSON.stringify(localStorage.getItem('user'))
    //     if(!token && currentPath !=='/login'){
    //          <Redirect to="/login" />
    //     }
    //     if(role == 'student'){
    //         if(token){

    //         }
    //     }
    // },