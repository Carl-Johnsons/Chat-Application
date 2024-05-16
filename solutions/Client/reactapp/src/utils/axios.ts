import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATE_WAY_PORT_URL,
  withCredentials: true,
});
const protectedAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATE_WAY_PORT_URL,
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage?.getItem("access_token") ?? ""
    )}`,
  },
  withCredentials: true,
});
export { axiosInstance, protectedAxiosInstance };
