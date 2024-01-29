import { JwtToken } from "../../Models";
import { setLocalStorageItem } from "../LocalStorageUtils";
import { BASE_ADDRESS, handleAPIRequest } from "./APIUtils";

export const login = async (
  phoneNumber: string,
  password: string
): Promise<[JwtToken | null, unknown]> => {
  const url = BASE_ADDRESS + "/api/Auth/Login";
  const [jwtToken, error] = await handleAPIRequest<JwtToken>({
    url,
    method: "POST",
    data: {
      phoneNumber,
      password,
    },
    requireAuth: false,
  });
  if (jwtToken) {
    setLocalStorageItem("accessToken", jwtToken);
  }
  return [jwtToken, error];
};
