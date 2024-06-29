import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";

interface Props {
  content: string;
  tagIds: string[];
  blobs?: Blob[];
}

interface FetchProps extends Props, AxiosProps {}

const createPost = async ({
  content,
  tagIds,
  blobs = [],
  axiosInstance,
}: FetchProps): Promise<void> => {
  const url = "/api/post";

  const formData = new FormData();

  formData.append("content", content);
  tagIds.forEach((tagId) => {
    formData.append("tagIds", tagId);
  });
  blobs.forEach((b) => {
    formData.append("files", b);
  });

  const response = await axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<void, Error, Props, unknown>({
    mutationFn: ({ content, tagIds, blobs }: Props) =>
      createPost({
        content,
        tagIds,
        blobs,
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
