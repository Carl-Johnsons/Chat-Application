import { AxiosError, AxiosRequestConfig } from "axios";
import { useLayoutEffect } from "react";
import { useLocalStorage } from ".";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/utils";
import { JwtToken } from "@/models";
import { useRefreshToken } from "./queries/auth";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const useAxiosInterceptor = () => {
  const router = useRouter();
  const { mutateAsync: refreshTokenMutateAsync } = useRefreshToken();
  const [getAccessTokenObj] = useLocalStorage("accessToken");

  useLayoutEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const accessToken = (getAccessTokenObj() as unknown as JwtToken)?.token;
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

        if (error?.response?.status == 401 && !prevRequest?._retry) {
          prevRequest._retry = true;
          const newAccessToken = await refreshTokenMutateAsync();
          console.log("Refreshing toker");

          // Case: Token expired or invalid navigate user back to login page
          if (!newAccessToken) {
            router.push("/login");
            return;
          }
          console.log({ newAccessToken });

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
  }, [getAccessTokenObj, refreshTokenMutateAsync, router]);
  return axiosInstance;
};
export { useAxiosInterceptor };
