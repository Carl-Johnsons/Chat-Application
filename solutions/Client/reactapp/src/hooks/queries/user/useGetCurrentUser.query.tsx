import { axiosInstance } from "@/utils";
import { User } from "@/models";
import {
  QueryKey,
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useLocalStorage } from "@/hooks";
import camelcaseKeysDeep from "camelcase-keys-deep";

const QUERY_KEY = "currentUser";
type UserClaimResponse = User & {
  sub: string;
};

const getUserProfile = async (accessToken: string): Promise<User | null> => {
  const url = "http://localhost:5001/connect/userinfo";
  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
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
  const [getAccessToken] = useLocalStorage("access_token");

  const queryClient = useQueryClient();
  return useQuery({
    ...queryOptions,
    queryKey: [QUERY_KEY],
    queryFn: () => getUserProfile(getAccessToken() as string),
    initialData: () => {
      return queryClient.getQueryData<User | null>([QUERY_KEY]);
    },
  });
};

export { useGetCurrentUser };
