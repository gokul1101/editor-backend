import axios from "axios";
const baseURL = "http://localhost:5000";

const helperService = {
  rejectionHandler: ({ response }) => {
    return Promise.reject({
      status: response.status,
      data: response.data,
    });
  },
  //* =================== PUBLIC ROUTE ==================== *//
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
      let { status, data } = err.response;
      return Promise.reject({
        status,
        message: data.message,
      });
    }
  },
  //* ================= PRIVATE ROUTES ======================== *//
  getUser: async (payload, config) => {
    let url = `${baseURL}/api/v1/user/get`;
    if (payload.id) url += `?id=${payload.id}`;
    else if (payload.regno) url += `?regno=${payload.regno}`;
    try {
      const { status, data } = await axios.get(url, config);
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch ({ response }) {
      return Promise.reject({
        status: response.status,
        data: response.data,
      });
    }
  },
  getContestWithCode: async (payload, config) => {
    let url = `${baseURL}/api/v1/contest/get`;
    if (payload.id) url += `?id=${payload.id}`;
    else if (payload.code) url += `?code=${payload.code}`;
    try {
      const { data, status } = await axios.get(url, config);
      if (status === 200) {
        return Promise.resolve({
          status,
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
};
export default helperService;
