import { protectedAxiosInstance } from "@/utils";
import { User } from "@/models";
import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import camelcaseKeysDeep from "camelcase-keys-deep";

const QUERY_KEY = "currentUser";
type UserClaimResponse = User & {
  sub: string;
};

const getUserProfile = async (): Promise<User | null> => {
  const url = "http://localhost:5001/connect/userinfo";
  const response = await protectedAxiosInstance.get(url);
  // The json response from identity server 4 is snake_case by default
  const transformedUserClaimResponseData = camelcaseKeysDeep(
    response.data
  ) as UserClaimResponse;
  const userData: User = {
    ...transformedUserClaimResponseData,
    id: transformedUserClaimResponseData.sub,
    isOnline: false,
  };

  console.log({ transformedUserClaimResponseData });

  return userData;
};

const useGetCurrentUser = (
  queryOptions: Omit<
    UseQueryOptions<User | null, unknown, User | null, QueryKey>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...queryOptions,
    queryKey: [QUERY_KEY],
    queryFn: () => getUserProfile(),
    initialData: () => {
      return queryClient.getQueryData<User | null>([QUERY_KEY]);
    },
  });
};

export { useGetCurrentUser };
