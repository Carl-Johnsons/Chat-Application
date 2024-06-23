import { useAxios } from "@/hooks";
import { AxiosProps, User } from "@/models";
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
  "http://schemasMicrosoftCom/ws/2008/06/identity/claims/role"?: string;
};
interface Props extends AxiosProps {}

const getUserProfile = async ({
  axiosInstance,
}: Props): Promise<User | null> => {
  const url = "http://localhost:5001/connect/userinfo";
  const response = await axiosInstance.get(url);
  // The json response from identity server 4 is snake_case by default
  const transformedUserClaimResponseData = camelcaseKeysDeep(
    response.data
  ) as UserClaimResponse;

  const userData: User = {
    ...transformedUserClaimResponseData,
    id: transformedUserClaimResponseData.sub,
    role:
      transformedUserClaimResponseData[
        "http://schemasMicrosoftCom/ws/2008/06/identity/claims/role"
      ] ?? "User",
    isOnline: false,
  };

  console.log({ userData });

  return userData;
};

const useGetCurrentUser = (
  queryOptions: Omit<
    UseQueryOptions<User | null, unknown, User | null, QueryKey>,
    "queryKey" | "queryFn" | "initialData"
  > = {}
) => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useQuery({
    ...queryOptions,
    queryKey: [QUERY_KEY],
    queryFn: () => getUserProfile({ axiosInstance: protectedAxiosInstance }),
    initialData: () => {
      return queryClient.getQueryData<User | null>([QUERY_KEY]);
    },
  });
};

export { useGetCurrentUser };
