import axios from "axios";
const baseURL = "http://localhost:5000";

const helperService = {
  login: async (payload) => {
    try {
      const { status, data } = await axios.post(
        `${baseURL}/api/v1/login`,
        payload
      );
      console.log(status, data);
      // if(response) return response
      if (status === 200) {
        return Promise.resolve({
          status,
          message: data.message,
          data,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        message: err.response.data,
      });
    }
  },
  getUser: async (payload, config) => {
    try {
      const { status, data } = await axios.get(
        `${baseURL}/api/v1/user/get`,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status: 200,
          message: data.message,
          data: data.userDetails,
        });
      }
    } catch (err) {
      // console.log(err.response.status)
      return Promise.reject({
        status: err.response.status,
        message: err.response.data,
      });
    }
  },
  getContestWithCode: async (payload, config) => {
    try {
      const { status, data } = await axios.post(
        `${baseURL}/api/v1/contest/get`,
        payload,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status: 200,
          message: data.message,
          data: data.userDetails,
        });
      }
    } catch (err) {
      // console.log(err.response.status)
      return Promise.reject({
        status: err.response.status,
        message: err.response.data,
      });
    }
  },
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
