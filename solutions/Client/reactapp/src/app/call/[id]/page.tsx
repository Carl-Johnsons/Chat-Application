"use client";
import style from "./style.module.scss";
import className from "classnames/bind";
import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import React, { useEffect, useState } from "react";
import { useGlobalState, usePeer } from "@/hooks";

const VideoCall: React.FC = () => {
  const cx = className.bind(style);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  // const [hasRemoteVideo, setHasRemoteVideo] = useState(false);
  const [signalData] = useGlobalState("signalData");
  const [userPeer] = useGlobalState("userPeer");
  const {
    callStatus,
    remoteVideoRef,
    localVideoRef,
    initiateCallerPeer,
    initiateCalleePeer,
    muteMic,
    unmuteMic,
    enableCamera,
    disableCamera,
    exitCall,
  } = usePeer();
  //const [activeConversationId] = useGlobalState("activeConversationId");
  //const activeConversationId = new URLSearchParams(window.location.search).get("activeConversationId") || undefined;
  const [activeConversationId, setActiveConversationId] = useState<
    string | undefined
  >(undefined);

  const handleToggleMic = () => {
    if (isMicOn) {
      muteMic();
    } else {
      unmuteMic();
    }
    setIsMicOn(!isMicOn);
  };
  const handleToggleCamera = () => {
    if (isCameraOn) {
      disableCamera();
    } else {
      enableCamera();
    }
    setIsCameraOn(!isCameraOn);
  };

  const handleExitCall = () => {
    exitCall();
  };

  useEffect(() => {
    const id =
      new URLSearchParams(window.location.search).get("activeConversationId") ||
      undefined;
    setActiveConversationId(id);
  }, []);

  useEffect(() => {
    const startVideoCall = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("activeId:", activeConversationId);

      if (activeConversationId === undefined) return;

      if (userPeer) return;

      if (signalData) {
        console.log("create callee peer********************************");
        initiateCalleePeer({
          callerSignalData: signalData,
          stream,
          conversationId: activeConversationId,
        });
      } else {
        console.log("create caller peer*******************************");
        initiateCallerPeer({ conversationId: activeConversationId, stream });
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    };
    startVideoCall();
  }, [activeConversationId]);

  return (
    <div className={cx("video-call-container")}>
      <div
        className={cx("videos", {
          "has-remote-video": !!remoteVideoRef.current?.srcObject,
        })}
      >
        <video
          ref={localVideoRef}
          className={cx("local-video")}
          autoPlay
          muted
        />
        <video ref={remoteVideoRef} className={cx("remote-video")} autoPlay />
      </div>
      <div className={cx("controls")}>
        <AppButton
          className={cx("p-2", "rounded-circle")}
          onClick={handleToggleMic}
        >
          <Avatar
            avatarClassName={cx("rounded-circle")}
            variant="avatar-img-30px"
            src={isMicOn ? images.micIcon.src : images.muteIcon.src}
            alt="mic button icon"
          />
        </AppButton>

        <AppButton
          className={cx("p-2", "rounded-circle")}
          onClick={handleToggleCamera}
        >
          <Avatar
            avatarClassName={cx("rounded-circle")}
            variant="avatar-img-30px"
            src={isCameraOn ? images.videoOnIcon.src : images.videoOffIcon.src}
            alt="cam button icon"
          />
        </AppButton>

        <AppButton
          className={cx("p-2", "rounded-circle")}
          variant="app-btn-danger"
          onClick={handleExitCall}
        >
          <Avatar
            avatarClassName={cx("rounded-circle")}
            variant="avatar-img-30px"
            src={images.phoneCallDeclineBtn.src}
            alt="exit button icon"
          />
        </AppButton>
      </div>
      <h1 className={cx("status")}>Status: {callStatus}</h1>
    </div>
  );
};

export default VideoCall;
