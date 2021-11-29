import Login from '../components/Login/Login'
import apiService from './apiService'

const helperService = {
    login : async (payload) => {
        const response = await apiService.loginService(payload)
        if(response) return response
    },
    getUser : async (payload,config) => {
        const response = await apiService.getUserService(payload,config)
        if(response) return response
    }
}
export default helperService