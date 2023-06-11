import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

//export const setToken = (token) => Cookie.set('oToken', token);

// Axios.interceptors.request.use((config) => {

//    //const token = Cookie.get('oToken');
//     const token = localStorage.getItem('token');
//     config.headers.Authorization = `Bearer ${token}`
//     return config;
// });

// Axios.defaults.headers.common['ngrok-skip-browser-warning']=true;
// Axios.defaults.withCredentials = true;
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const response = error;
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(error);
    }

    throw error;
  }
);
export default Axios;
