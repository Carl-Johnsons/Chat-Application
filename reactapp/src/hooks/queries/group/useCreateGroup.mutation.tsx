import { Group, GroupWithMemberId } from "@/models";
import { axiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * @param {GroupWithMemberId} groupWithMemberId
 * @returns
 */
const createGroup = async (
  groupWithMemberId: GroupWithMemberId
): Promise<Group | null> => {
  const url = "/api/Group";
  const respone = await axiosInstance.post(url, groupWithMemberId);
  return respone.data;
};

const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Group | null,
    Error,
    { groupWithMemberId: GroupWithMemberId },
    unknown
  >({
    mutationFn: ({ groupWithMemberId }) => createGroup(groupWithMemberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },
    onError: (error) => {
      console.error("Failed to create group: " + error.message);
    },
  });
};

export { useCreateGroup };
