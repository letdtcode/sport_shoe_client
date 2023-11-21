import axios from "axios";
import { getToken, getRefreshToken, updateToken } from "./token";
import URL from "../URL";
const instance = axios.create({

  baseURL: (`${URL}/api/v1/`),
  timeout: 50000,
  validateStatus: function (status) {
    return (status >= 200 && status < 400 )|| status === 404;
  },
});
instance.interceptors.request.use(

  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
        
    return config;
  },
  (error) => {
   
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (res) => {
   
    return res;
  },
  async (error) => {
    const originalConfig = error.config;
   
    if (originalConfig.url !== `/users/login` && error.response) {
      if ((error.response.status === 401 || error.response.status === 500) && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = getRefreshToken();
          const response = await axios.post(`${URL}/api/v1/users/refresh_token`, { refreshToken: refreshToken });
          const acessToken = response.data.accessToken;
          updateToken(acessToken);

          originalConfig.headers["Authorization"] = `Bearer ${acessToken}`;
          return axios(originalConfig);
        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
)
export default instance;
