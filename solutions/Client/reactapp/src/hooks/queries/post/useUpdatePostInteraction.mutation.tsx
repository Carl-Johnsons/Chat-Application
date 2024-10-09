import { AxiosProps } from "@/models";
import { useAxios } from "@/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  postId: string;
  interactionId: string;
}

interface FetchProps extends Props, AxiosProps {}

const updateInteractPost = async ({
  postId,
  interactionId,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/post/interact";
  const data = {
    postId,
    interactionId,
  };
  const response = await axiosInstance.put(url, data);
  return response.data;
};

const useUpdatePostInteraction = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, Props>({
    mutationFn: ({ postId, interactionId }: Props) =>
      updateInteractPost({
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
      console.error("Failed to update post interaction: " + err.message);
    },
  });
  return mutation;
};

export { useUpdatePostInteraction };
