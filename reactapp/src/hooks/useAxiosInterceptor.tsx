import { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "../Utils/Api/axios";
import { getLocalStorageItem } from "../Utils/LocalStorageUtils";
import { useLayoutEffect } from "react";
import { useRefreshToken } from ".";
import { NavigateFunction } from "react-router-dom";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const useAxiosInterceptor = (navigate: NavigateFunction) => {
  const refresh = useRefreshToken();

  useLayoutEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = getLocalStorageItem("accessToken")?.token;
        if (!config.headers.Authorization && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        config.headers["Content-Type"] = "application/json";
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error?.config as CustomAxiosRequestConfig;
        console.log("intercept");

        if (error?.response?.status == 401 && !prevRequest?._retry && refresh) {
          prevRequest._retry = true;
          const newAccessToken = await refresh();
          // Case: Token expired or invalid navigate user back to login page
          if (!newAccessToken) {
            navigate("/login");
            return;
          }
          if (prevRequest.headers) {
            prevRequest.headers.Authorization = `Bearer ${newAccessToken.token}`;
          }
          return axiosInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refresh]);
  return axiosInstance;
};
export default useAxiosInterceptor;
