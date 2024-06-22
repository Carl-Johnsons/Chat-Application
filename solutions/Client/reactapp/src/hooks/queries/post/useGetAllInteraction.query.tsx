import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosProps, Interaction } from "@/models";
import { useAxios } from "hooks/useAxios";

interface FetchTagProps extends AxiosProps {}

const getAllInteraction = async ({
  axiosInstance,
}: FetchTagProps): Promise<Interaction[]> => {
  const url = `/api/post/interaction`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetAllInteraction = (
  queryOptions: Omit<
    UseQueryOptions<Interaction[], Error, Interaction[], unknown[]>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const { protectedAxiosInstance } = useAxios();

  return useQuery({
    ...queryOptions,
    queryKey: ["interactionList"],
    queryFn: () => getAllInteraction({ axiosInstance: protectedAxiosInstance }),
  });
};

export { useGetAllInteraction };
