import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";

interface Props {
  content: string;
  tagIds: string[];
}

interface FetchProps extends Props, AxiosProps {}

const createPost = async ({
  content,
  tagIds,
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/post";
  const data = {
    content,
    tagIds,
  };
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, unknown>({
    mutationFn: ({ content, tagIds }: Props) =>
      createPost({
        content,
        tagIds,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "infinite"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to create post: " + err.message);
    },
  });
  return mutation;
};

export { useCreatePost };
