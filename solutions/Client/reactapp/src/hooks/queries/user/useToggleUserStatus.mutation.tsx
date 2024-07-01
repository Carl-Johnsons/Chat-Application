import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "hooks/useAxios";
import { toast } from "react-toastify";

interface Props {
  userId: string;
  active: boolean;
}

interface FetchProps extends Props, AxiosProps {}

export const toggleUserStatus = async ({
  userId,
  active,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = `http://localhost:5001/api/users/${
    active ? "enable" : "disable"
  }`;
  const data = {
    id: userId,
  };
  let response;
  if (active) {
    response = await axiosInstance.put(url, data);
  } else {
    response = await axiosInstance.delete(url, {
      data,
    });
  }
};

const useToggleUserStatus = () => {
  const { protectedAxiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation<Props, Error, Props, unknown>({
    mutationFn: async ({ userId, active }) => {
      await toggleUserStatus({
        userId,
        active,
        axiosInstance: protectedAxiosInstance,
      });
      return { userId, active };
    },
    onSuccess: (data: Props) => {
      const { userId } = data;
      console.log("Update user status successfully!");
      queryClient.invalidateQueries({
        queryKey: ["users", userId],
        exact: true,
      });
      toast.success("Cập nhật trạng thái người dùng thành công");
    },
    onError: () => {
      toast.error("Cập nhật trạng thái người dùng thất bại");
    },
  });
};

export { useToggleUserStatus };
