import axios from "axios";

const API_DEFAULT_GATEWAY = "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_PORT_URL ?? API_DEFAULT_GATEWAY,
  withCredentials: true,
});

let accessToken = undefined;

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem("access_token");
}

if (accessToken) {
  accessToken = JSON.parse(accessToken);
}
accessToken ??= "";

const protectedAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_PORT_URL ?? API_DEFAULT_GATEWAY,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});
export { axiosInstance, protectedAxiosInstance };
