import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";

interface Props {
  postId: string;
}

interface FetchProps extends Props, AxiosProps {}

const undoInteractPost = async ({
  postId,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/post/interact";
  const data = {
    postId,
  };
  const response = await axiosInstance.delete(url, {
    data,
  });
  return response.data;
};

const useUndoInteractPost = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, Props>({
    mutationFn: ({ postId }: Props) =>
      undoInteractPost({
        postId,
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
      console.error("Failed to undo interact: " + err.message);
    },
  });
  return mutation;
};

export { useUndoInteractPost };
