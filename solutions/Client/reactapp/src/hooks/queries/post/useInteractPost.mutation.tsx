import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";

interface Props {
  postId: string;
  interactionId: string;
}

interface FetchProps extends Props, AxiosProps {}

const interactPost = async ({
  postId,
  interactionId,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/post/interact";
  const data = {
    postId,
    interactionId,
  };
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useInteractPost = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, Props>({
    mutationFn: ({ postId, interactionId }: Props) =>
      interactPost({
        postId,
        interactionId,
        axiosInstance: protectedAxiosInstance,
      }),
    onMutate: (context: Props) => {
      return context;
    },
    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["post", context.postId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["interactionList", context.postId],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to interact post: " + err.message);
    },
  });
  return mutation;
};

export { useInteractPost };
