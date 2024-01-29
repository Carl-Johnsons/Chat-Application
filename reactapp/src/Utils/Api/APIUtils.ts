import { RequestMethod } from "../../Models";
import { getLocalStorageItem } from "../LocalStorageUtils";
import RequestInitBuilder from "../RequestInitBuilder";

export const BASE_ADDRESS: string = import.meta.env.VITE_BASE_API_URL;

type APIRequestConfig = {
  url: string;
  method: RequestMethod;
  data?: object;
  requireAuth?: boolean;
};
export const handleAPIRequest = async <T>({
  url,
  method,
  data,
  requireAuth = true,
}: APIRequestConfig): Promise<[T | null, unknown]> => {
  try {
    const fetchConfig = new RequestInitBuilder()
      .withMethod(method)
      .withContentJson()
      .withBody(data ? JSON.stringify(data) : undefined)
      .withJwtAuthorization(
        requireAuth ? getLocalStorageItem("accessToken")?.token : null
      )
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }

    const responseData: T = await response.json();
    return [responseData, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
export const handleStatusRequest = async ({
  url,
  method,
  data,
  requireAuth = true,
}: APIRequestConfig): Promise<[number | null, unknown]> => {
  try {
    const fetchConfig = new RequestInitBuilder()
      .withMethod(method)
      .withContentJson()
      .withBody(data ? JSON.stringify(data) : undefined)
      .withJwtAuthorization(
        requireAuth ? getLocalStorageItem("accessToken")?.token : null
      )
      .build();

    const response = await fetch(url, fetchConfig);
    return [response.status, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
