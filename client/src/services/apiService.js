import axios from 'axios'
const baseURL = "http://localhost:5000"
const apiService = {
    loginService : async (payload) => {
            return (await axios.post(`${baseURL}/api/v1/login`,payload)).data

    },
    getUserService : async (payload,config) => {
        return (await axios.get(`${baseURL}/api/v1/user/get/:${payload.regno}`,config))
    }
}
export default apiService