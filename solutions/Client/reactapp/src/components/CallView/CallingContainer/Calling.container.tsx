//import React, { useCallback } from "react";
import style from "./Calling.container.module.scss";
import classNames from "classnames/bind";
import { useGlobalState, useModal, usePeer } from "@/hooks";
import { useGetUser } from "@/hooks/queries/user";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import AppButton from "@/components/shared/AppButton";
import { useRouter } from "next/navigation";
//import { count } from "console";

const cx = classNames.bind(style);

const CallingContainer = () => {
  const [entityId] = useGlobalState("modalEntityId");
  const router = useRouter();
  // const [signalData] = useGlobalState("signalData");
  // const [activeConversationId] = useGlobalState("activeConversationId");

  // const { initiateCalleePeer } = usePeer();

  //hook
  const { data: caller } = useGetUser(entityId, {
    enabled: !!entityId,
  });
  const { handleHideModal } = useModal();

  const handleDeclineCall = () => {
    handleHideModal();
  };

  // const handleAcceptCall = useCallback(() => {
  //   router.push("/call/1");
  //   //initiateCalleePeer({ callerSignalData: signalData, conversationId: activeConversationId })
  // }, [signalData])

  const handleAcceptCall = () => {
    router.push("/call/1");
    //initiateCalleePeer({ callerSignalData: signalData, conversationId: activeConversationId })
  }

  return (
    <div className={cx("d-flex", "flex-column", "align-items-center")}>
      <Avatar
        variant="avatar-img-80px"
        avatarClassName={cx("rounded-circle")}
        src={caller?.avatarUrl ?? images.defaultAvatarImg.src}
        alt="caller avatar"
      />
      <div className={cx("mb-2", "fw-medium", "fs-3")}>{caller?.name}</div>
      <div className={cx("btn-container", "d-flex", "gap-3", "mb-2")}>
        <AppButton
          className={cx("p-2", "rounded-circle")}
          variant="app-btn-phone-call"
          onClick={handleAcceptCall}
        >
          <Avatar
            avatarClassName={cx("rounded-circle")}
            variant="avatar-img-30px"
            src={images.phoneCallBtn.src}
            alt="call button icon"
          />
        </AppButton>
        <AppButton
          className={cx("p-2", "rounded-circle")}
          variant="app-btn-phone-call-decline"
          onClick={handleDeclineCall}
        >
          <Avatar
            avatarClassName={cx("rounded-circle")}
            variant="avatar-img-30px"
            src={images.phoneCallDeclineBtn.src}
            alt="call decline button icon"
          />
        </AppButton>
      </div>
    </div>
  );
};

export { CallingContainer };
