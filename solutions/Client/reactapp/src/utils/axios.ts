import axios from "axios";

const API_DEFAULT_GATEWAY = "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_PORT_URL ?? API_DEFAULT_GATEWAY,
  withCredentials: true,
});
const protectedAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_PORT_URL ?? API_DEFAULT_GATEWAY,
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage?.getItem("access_token") ?? ""
    )}`,
  },
  withCredentials: true,
});
export { axiosInstance, protectedAxiosInstance };
