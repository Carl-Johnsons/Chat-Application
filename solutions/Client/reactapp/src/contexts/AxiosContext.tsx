import { createContext, useEffect, useMemo, useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useSession } from "next-auth/react";
import { API_GATEWAY_URL } from "@/constants/url.constant";

interface AxiosContextType {
  axiosInstance: AxiosInstance;
  protectedAxiosInstance: AxiosInstance;
}
interface Props {
  children: React.ReactNode;
}

const AxiosContext = createContext<AxiosContextType | null>(null);

const AxiosProvider = ({ children }: Props) => {
  const { data: session, status } = useSession();

  const accessToken = session?.accessToken ?? "";

  console.log("Query axios with access token ", accessToken);
  console.log("Expire in ", session?.accessToken);

  const [axiosInstance] = useState(() =>
    axios.create({
      baseURL: API_GATEWAY_URL,
      withCredentials: true,
    })
  );

  const [protectedAxiosInstance] = useState(() =>
    axios.create({
      baseURL: API_GATEWAY_URL,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
  );
  useEffect(() => {
    const getAccessToken = () => {
      return new Promise<string>((resolve, reject) => {
        if (status === "authenticated" && session.accessToken) {
          resolve(session.accessToken);
        } else if (status === "unauthenticated") {
          reject("Unauthorized");
        } else {
          const interval = setInterval(() => {
            if (session?.accessToken) {
              resolve(session.accessToken);
              clearInterval(interval);
            }
          }, 100);
        }
      });
    };

    const requestInterceptor = protectedAxiosInstance.interceptors.request.use(
      async (config) => {
        try {
          console.log("Request interceptor");
          const token = await getAccessToken();

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        } catch (err) {
          return Promise.reject(err);
        }
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    return () => {
      protectedAxiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [
    protectedAxiosInstance.interceptors.request,
    session?.accessToken,
    status,
  ]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return { axiosInstance, protectedAxiosInstance };
  }, [axiosInstance, protectedAxiosInstance]);

  return (
    <AxiosContext.Provider value={contextValue}>
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosProvider, AxiosContext };
