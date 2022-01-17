import axios from "axios";
import { decryption, encryption } from "./crypto-js/index";
const baseURL = "http://localhost:5000";
// const baseURL = "http://172.16.15.173";

const helperService = {
  rejectionHandler: ({ response }) => {
    return Promise.reject({
      status: response.status,
      data: response.data,
    });
  },
  //* =================== PUBLIC ROUTE ==================== *//
  login: async (payload) => {
    payload = {
      encryptedData: encryption(payload),
    };
    try {
      let { status, data } = await axios.post(
        `${baseURL}/api/v1/login`,
        payload
      );
      data = decryption(data);
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
          message: data.message,
        });
      }
    } catch (err) {
      let { status, data } = err.response;
      data = decryption(data);
      return Promise.reject({
        status,
        message: data.message,
      });
    }
  },

  //* ================= PRIVATE ROUTES ======================== *//

  //** USERS */
  createUser: async (payload, config) => {
    payload = {
      encryptedData: encryption(payload),
    };
    try {
      let { data, status } = await axios.post(
        `${baseURL}/api/v1/user/create`,
        payload,
        config
      );
      data = decryption(data);
      if (status === 201) {
        return Promise.resolve({
          status,
          message: data.message,
        });
      }
    } catch (err) {
      let { status, data } = err.response;
      data = decryption(data);
      return Promise.reject({
        status,
        message: data.message,
      });
    }
  },
  getUser: async (payload, config) => {
    let url = `${baseURL}/api/v1/user/get`;
    if (payload.id) url += `?id=${payload.id}`;
    else if (payload.regno) url += `?regno=${payload.regno}`;
    try {
      let { status, data } = await axios.get(url, config);
      data = decryption(data);
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      let { status, data } = err.response;
      data = decryption(data);
      return Promise.reject({
        status,
        message: data.message,
      });
    }
  },
  updateUser: async (payload, config) => {
    payload = {
      encryptedData: encryption(payload),
    };
    try {
      let { data, status } = await axios.post(
        `${baseURL}/api/v1/user/update`,
        payload,
        config
      );
      data = decryption(data);
      if (status === 200) {
        return Promise.resolve({
          status,
          message: data.message,
        });
      }
    } catch (err) {
      let { status, data } = err.response;
      data = decryption(data);
      return Promise.reject({
        status,
        message: data.message,
      });
    }
  },
  deleteUser: async ({ regno }, config) => {
    try {
      let { data, status } = await axios.post(
        `${baseURL}/api/v1/user/delete?${regno}`,
        config
      );
      data = decryption(data);
      if (status === 200) {
        return Promise.resolve({
          status,
          message: data.message,
        });
      }
    } catch (err) {
      let { status, data } = err.response;
      data = decryption(data);
      return Promise.reject({
        status,
        message: data.message,
      });
    }
  },
  createBulkUsers: async ({ file }, headers) => {
    try {
      const { data, status } = await axios({
        url: `${baseURL}/api/v1/users/createAll`,
        method: "POST",
        headers,
        data: file,
      });
      if (status === 201) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        message: err.response.data.message || "Error in creating users.",
      });
    }
  },
  getUsers: async ({ page, limit }, config) => {
    try {
      let { status, data } = await axios.get(
        `${baseURL}/api/v1/users/getAll?page=${page}&limit=${limit}`,
        config
      );
      data = decryption(data);
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch ({ response }) {
      let { status, data } = response;
      data = decryption(data);
      return Promise.reject({
        status: status,
        data: data.message,
      });
    }
  },

  //** CONTESTS */
  createContest: async (payload, config) => {
    payload = {
      encryptedData: encryption(payload),
    };
    try {
      let { data, status } = await axios.post(
        `${baseURL}/api/v1/contest/create`,
        payload,
        config
      );
      data = decryption(data);
      return Promise.resolve({
        status,
        message: data.message,
      });
    } catch ({ response }) {
      let { status, data } = response;
      data = decryption(data);
      return Promise.reject({
        status,
        message: data.message,
      });
    }
  },
  getContest: async (payload, config) => {
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
        status: err?.response?.status,
        message: err?.response?.data,
      });
    }
  },
  updateContest: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/contest/update`,
        payload,
        config
      );
      return Promise.resolve({
        status,
        data,
      });
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  getContestWithCode: async (payload, config) => {
    let url = `${baseURL}/api/v1/contest/dashboard`;
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
        status: err?.response?.status,
        message: err?.response?.data.message,
      });
    }
  },
  getAllContests: async ({ page, past, limit }, config) => {
    try {
      const { data, status } = await axios.get(
        `${baseURL}/api/v1/contests/getAll?page=${page}&limit=${limit}&past=${past}`,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },

  //** QUIZZS */
  createQuizz: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/quiz/create`,
        payload,
        config
      );
      if (status === 201) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  getQuizzes: async ({ id }, config) => {
    try {
      const { status, data } = await axios.get(
        `${baseURL}/api/v1/quiz/all?id=${id}`,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  updateQuiz: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/quiz/update`,
        payload,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  deleteQuiz: async (payload, config) => {
    try {
      const { status, data } = await axios.post(
        `${baseURL}/api/v1/quiz/delete`,
        payload,
        config
      );
      if (status === 202) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  getQuizQuestions: async ({ id, page = 1 }, config) => {
    try {
      const { data, status } = await axios.get(
        `${baseURL}/api/v1/mcq/all?id=${id}&page=${page}`,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  },
  createQuizQuestion: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/question/create`,
        payload,
        config
      );
      if (status === 201) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },

  //** CHALLENGES */
  createChallenge: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/question/create`,
        payload,
        config
      );
      if (status === 201) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  getChallenges: async ({ id }, config) => {
    try {
      const { data, status } = await axios.get(
        `${baseURL}/api/v1/challenges/all?id=${id}`,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  },
  //** QUESTIONS */
  getQuestion: async ({ id, type }, config) => {
    try {
      const { data, status } = await axios.get(
        `${baseURL}/api/v1/question/get?id=${id}&type=${type} `,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        message: err.response.data.message,
      });
    }
  },
  updateQuestion: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/question/update?type=${payload.type_id}`,
        payload,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  deleteQuestion: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/question/delete?type=${payload.type_id}`,
        payload,
        config
      );
      if (status === 202) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  //** COMPILE */
  compile: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/compiler`,
        payload,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  runCode: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/run-code`,
        payload,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  //** TESTCASE */
  createTestcase: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/testcase/create`,
        payload,
        config
      );
      if (status === 201) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  getTestCases: async ({ questionId }, config) => {
    try {
      const { data, status } = await axios.get(
        `${baseURL}/api/v1/testcase/get?id=${questionId}`,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  updateTestcase: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/testcase/update`,
        payload,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  deleteTestcase: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/testcase/delete`,
        payload,
        config
      );
      if (status === 202) {
        return Promise.resolve({
          data,
          status,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  createSubmission: async (payload, config) => {
    try {
      const {
        data: { message },
        status,
      } = await axios.post(
        `${baseURL}/api/v1/submission/create`,
        payload,
        config
      );
      if (status === 201) {
        return Promise.resolve({
          status,
          message,
        });
      }
    } catch (err) {
      console.log(err.response);
      return Promise.reject({
        status: err.response.status,
        message: err.response.data,
      });
    }
  },
  getContestSubmissions: async ({ page, limit, contest_id }, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/submission/get?page=${page}&limit=${limit}`,
        { contest_id },
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  getErrorLogs: async (payload, config) => {
    try {
      const { data, status } = await axios.get(
        `${baseURL}/api/v1/errorLogs?created_by=${payload.created_by}`,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      return Promise.reject({
        status: err.response.status,
        data: err.response.data,
      });
    }
  },
  downloadStatistics: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/submission/export`,
        payload,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      console.log(err.response);
      return Promise.reject({
        status: err.response.status,
        message: err.response.data,
      });
    }
  },
  downloadStudentsDetails: async (payload, config) => {
    try {
      const { data, status } = await axios.post(
        `${baseURL}/api/v1/user/export`,
        payload,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      console.log(err.response);
      return Promise.reject({
        status: err.response.status,
        message: err.response.data,
      });
    }
  },
  adminDashboard: async (payload, config) => {
    try {
      let { data, status } = await axios.get(
        `${baseURL}/api/v1/user/admindashboard`,
        config
      );
      data = decryption(data);
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      console.log(err.response);
      return Promise.reject({
        status: err.response.status,
        message: err.response.data,
      });
    }
  },
  downloadSampleExcel: async (payload, config) => {
    try {
      const { data, status } = await axios.get(
        `${baseURL}/api/v1/sample_excel/download`,
        config
      );
      if (status === 200) {
        return Promise.resolve({
          status,
          data,
        });
      }
    } catch (err) {
      console.log(err.response);
      return Promise.reject({
        status: err.response.status,
        message: err.response.data,
      });
    }
  },
};
export default helperService;
