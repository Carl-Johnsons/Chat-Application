import { AxiosProps } from "@/models";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/hooks";

interface Props {
  postId: string;
  reason: string;
}

interface FetchProps extends Props, AxiosProps {}

const reportPost = async ({
  postId,
  reason,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/post/report";
  const data = {
    postId,
    reason,
  };
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useReportPost = () => {
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, Props>({
    mutationFn: ({ postId, reason }: Props) =>
      reportPost({
        postId,
        reason,
        axiosInstance: protectedAxiosInstance,
      }),
    onMutate: (context: Props) => {
      return context;
    },
    onSuccess: (_data, _variables, _context) => {},
    onError: (err) => {
      console.error("Failed to report post: " + err.message);
    },
  });
  return mutation;
};

export { useReportPost };
