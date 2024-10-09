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
  const { data: session } = useSession();

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
    // Update protectedAxiosInstance headers when accessToken changes
    protectedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    console.log("re-render protected axios");
    console.log(accessToken);
  }, [accessToken, protectedAxiosInstance]);

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
