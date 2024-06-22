import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";

interface Props {
  postId: string;
  content: string;
}

interface FetchProps extends Props, AxiosProps {}

const createComment = async ({
  postId,
  content,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/post/comment";
  const data = {
    postId,
    content,
  };
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, Props>({
    mutationFn: ({ postId, content }: Props) =>
      createComment({
        postId,
        content,
        axiosInstance: protectedAxiosInstance,
      }),
    onMutate: (context: Props) => {
      return context;
    },
    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["commentList", "postId", context.postId, "infinite"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to create comment: " + err.message);
    },
  });
  return mutation;
};

export { useCreateComment };
