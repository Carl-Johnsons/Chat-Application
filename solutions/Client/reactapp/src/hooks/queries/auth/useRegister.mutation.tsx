import { axiosInstance } from "@/utils";
import { useMutation } from "@tanstack/react-query";

interface IUserRegister {
  user: object;
}

const register = async ({ user }: IUserRegister): Promise<void> => {
  const url = "/api/Auth/Register";
  const respone = await axiosInstance.post(url, user);
  if (respone.status !== 201) {
    throw new Error("Something is wrong while registering");
  }
};

const useRegister = () => {
  return useMutation<void, Error, IUserRegister, unknown>({
    mutationFn: ({ user }) => register({ user }),
    onSuccess: () => {
      console.log("Register successfully!");
    },
    onError: (error) => {
      console.error("Register failed: " + error.message);
    },
  });
};

export { useRegister };
