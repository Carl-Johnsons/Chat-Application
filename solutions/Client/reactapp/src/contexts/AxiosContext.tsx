import React, { createContext, useEffect, useMemo, useState } from "react";
import axios, { AxiosInstance } from "axios";
import { useLocalStorage } from "hooks/useStorage";

const API_DEFAULT_GATEWAY = "http://localhost:5000";

interface AxiosContextType {
  axiosInstance: AxiosInstance;
  protectedAxiosInstance: AxiosInstance;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}
interface Props {
  children: React.ReactNode;
}

const AxiosContext = createContext<AxiosContextType | null>(null);

const AxiosProvider = ({ children }: Props) => {
  const [localToken] = useLocalStorage("access_token");
  const [accessToken, setAccessToken] = useState<string>(localToken);

  const [axiosInstance] = useState(() =>
    axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_API_GATEWAY_PORT_URL ?? API_DEFAULT_GATEWAY,
      withCredentials: true,
    })
  );

  const [protectedAxiosInstance] = useState(() =>
    axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_API_GATEWAY_PORT_URL ?? API_DEFAULT_GATEWAY,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
  );

  useEffect(() => {
    // Update protectedAxiosInstance headers when accessToken changes
    protectedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    console.log("re-render protected axios");
    console.log(accessToken);
  }, [accessToken, protectedAxiosInstance]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return { axiosInstance, protectedAxiosInstance, setAccessToken };
  }, [axiosInstance, protectedAxiosInstance]);

  return (
    <AxiosContext.Provider value={contextValue}>
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosProvider, AxiosContext };
