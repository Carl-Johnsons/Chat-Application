import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getLocalStorageItem } from "../LocalStorageUtils";
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getLocalStorageItem("accessToken")?.token;
    if (!config.headers.Authorization && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers["Content-Type"] = "application/json";
    console.log(config);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.log("Response interceptor run");
    const prevRequest = error?.config as CustomAxiosRequestConfig;

    if (error?.response?.status == 401 && !prevRequest?._retry) {
      console.log("REFRESH TOKEN !!!!");
      prevRequest._retry = true;
      const newAccessToken = " await refresh()";
      console.log({ newAccessToken });
      if (prevRequest.headers && newAccessToken) {
        prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
