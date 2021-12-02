import { Redirect } from "react-router";
import axios from "axios";
const baseURL = "http://localhost:5000";

const helperService = {
  rejectionHandler :({response}) => {
        return Promise.reject({
            status:response.status,
            data:response.data
        })
  },
  login: async (payload) => {
    try {
      const { status, data } = await axios.post(
        `${baseURL}/api/v1/login`,
        payload
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
          message: data.message,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  getUser: async (payload, config) => {
    try {
      let url = `${baseURL}/api/v1/user/get`;
      if (payload.id) url += `?id=${payload.id}`;
      else if (payload.regno) url += `?regno=${payload.regno}`;
      const { status, data } = await axios.get(url, config);
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch ({response}) {
        return Promise.reject({
            status:response.status,
            data:response.data
        })
    }
  },
  getContestWithCode : async (payload,config) => {
    try{

    }
    catch(err){

    }
  }
};
export default helperService;

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
