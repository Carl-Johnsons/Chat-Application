import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/utils";
import { GroupUser } from "@/models";

interface IJoinGroupProps {
  groupId: number;
  userId: number;
}

/**
 * @param {number} groupId
 * @param {number} userId
 * @returns
 */
export const joinGroup = async ({
  groupId,
  userId,
}: IJoinGroupProps): Promise<number | null> => {
  const groupUserObject: GroupUser = {
    groupId,
    userId,
  };

  const url = "/api/Group/Join";
  const respone = await axiosInstance.post(url, groupUserObject);
  return respone.status;
};

const useJoinGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<number | null, Error, IJoinGroupProps, unknown>({
    mutationFn: ({ groupId, userId }) => joinGroup({ groupId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grouplist"],
        exact: true,
      });
    },
    onError: (error) => {
      console.error("Failed to join group! " + error.message);
    },
  });
};

export default useJoinGroup;
