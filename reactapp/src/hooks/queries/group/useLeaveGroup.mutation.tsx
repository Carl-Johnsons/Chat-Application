import { axiosInstance } from "@/utils";
import { GroupUser } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ILeaveGroupProps {
  groupId: number;
  userId: number;
}
/**
 * @param {number} groupId
 * @param {number} userId
 * @returns
 */
const leaveGroup = async ({
  groupId,
  userId,
}: ILeaveGroupProps): Promise<void> => {
  const groupUserObject: GroupUser = {
    groupId,
    userId,
  };

  const url = "/api/Group/Leave";
  const respone = await axiosInstance.post(url, groupUserObject);
  if (!(respone.status >= 200 && respone.status <= 299)) {
    throw new Error("Leave group fail. ");
  }
};

const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, ILeaveGroupProps, unknown>({
    mutationFn: ({ groupId, userId }) => leaveGroup({ groupId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["grouplist"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
};

export default useLeaveGroup;
