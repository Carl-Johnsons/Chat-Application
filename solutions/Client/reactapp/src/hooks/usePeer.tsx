import { useCallback, useEffect, useRef, useState } from "react";
import Peer, { SignalData } from "simple-peer";
import {
  signalRAcceptCall,
  signalRSendCallSignal,
  useGlobalState,
  useSignalREvents,
} from "@/hooks";
import { CALL_STATUS } from "../data/constants";
import { useRouter } from "next/navigation";
import { useSignalR } from "./signalREvents";

type InitCallerPeerProps = { conversationId?: string; stream: MediaStream };

type InitCalleePeerProps = {
  conversationId?: string;
  stream: MediaStream;
  callerSignalData: SignalData;
};

const usePeer = () => {
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { invokeAction } = useSignalREvents();
  const [, setSignalData] = useGlobalState("signalData");
  const [, setUserPeer] = useGlobalState("userPeer");
  const peerRef = useRef<Peer.Instance | null>(null);
  const [callStatus, setCallStatus] = useState(CALL_STATUS.PREPARING);
  const router = useRouter();
  const { connection: signalRConnection, connected: signalRConnected } =
    useSignalR();

  const initiateCallerPeer = useCallback(
    ({ conversationId, stream }: InitCallerPeerProps) => {
      if (!signalRConnected) {
        console.log("signalR not connected");
        return;
      }
      if (!signalRConnection) {
        console.log("signalR connection not found", signalRConnection);
        return;
      }
      console.log("signalR connected");
      console.log(signalRConnection?.connectionId);

      setCallStatus(CALL_STATUS.CONNECTING);
      streamRef.current = stream;
      const peer = new Peer({
        initiator: true, // Adjust as necessary, can be set based on context
        trickle: false,
        stream,
      });
      console.log("caller in conversation id:" + conversationId);
      peerRef.current = peer;
      peer.on("signal", (signalData) => {
        console.log(
          "send signal caller*****************************",
          remoteVideoRef
        );
        const data = JSON.stringify(signalData);
        if (conversationId) {
          console.log("co conversation", conversationId);
          setCallStatus(CALL_STATUS.CALLING);
          invokeAction(
            signalRSendCallSignal({
              signalData: data,
              targetConversationId: conversationId,
            })
          );
        }
      });
      peer.on("stream", (stream) => {
        setCallStatus(CALL_STATUS.CONNECTING);
        console.log("send steam caller*****************************");
        if (
          remoteVideoRef.current &&
          remoteVideoRef.current.srcObject !== stream
        ) {
          remoteVideoRef.current.srcObject = stream;
        }
        remoteVideoRef.current?.play();
      });
      peer.on("connect", () => {
        setCallStatus(CALL_STATUS.CONNECTED);
      });
      peer.on("close", () => {
        setCallStatus(CALL_STATUS.EXITED);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
        exitCall();
      });
      peer.on("error", () => {
        console.log("Callee error");
        setCallStatus(CALL_STATUS.EXITED);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
        exitCall();
      });
      return peer;
    },
    [signalRConnected, signalRConnection]
  );

  const initiateCalleePeer = useCallback(
    ({ callerSignalData, stream, conversationId }: InitCalleePeerProps) => {
      setCallStatus(CALL_STATUS.PREPARING);
      streamRef.current = stream;
      const peer = new Peer({
        initiator: false, // Adjust as necessary, can be set based on context
        trickle: false,
        stream,
      });
      peerRef.current = peer;
      setUserPeer(peer);
      console.log("global userpeer", peer);
      console.log("conversation id callee:", conversationId);

      peer.on("signal", (signalData) => {
        if (conversationId) {
          setCallStatus(CALL_STATUS.CONNECTING);
          console.log("invoke acceppCall to pair with caller peer");
          invokeAction(
            signalRAcceptCall({
              signalData: JSON.stringify(signalData),
              targetConversationId: conversationId,
            })
          );
        }
      });
      peer.on("stream", (stream) => {
        setCallStatus(CALL_STATUS.CONNECTING);
        console.log(
          "send steam callee*****************************",
          remoteVideoRef,
          remoteVideoRef.current
        );
        if (remoteVideoRef.current) {
          console.log("ok steam callee");
          remoteVideoRef.current.srcObject = stream;
        }
        remoteVideoRef.current?.play();
      });
      peer.on("connect", () => {
        setCallStatus(CALL_STATUS.CONNECTED);
      });
      peer.on("close", () => {
        setCallStatus(CALL_STATUS.EXITED);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
        exitCall();
      });
      peer.on("error", () => {
        console.log("Caller error");
        setCallStatus(CALL_STATUS.EXITED);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
        exitCall();
      });
      console.log("caller sigaldata", callerSignalData);
      console.log("peer 2 signal peer 1");
      peer.signal(callerSignalData);
      return peer;
    },
    []
  );

  const muteMic = (): void => {
    if (streamRef.current) {
      console.log("enable mic");
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = false; // Tắt mic
    }
  };

  const unmuteMic = (): void => {
    if (streamRef.current) {
      console.log("dis mic");
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = true; // Bật mic
    }
  };

  const disableCamera = (): void => {
    //stopVideo();
    if (streamRef.current) {
      console.log("dis cam");
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = false;
        setTimeout(() => {
          videoTrack.stop();
          console.log("stop video track");
        }, 100);
      }
    }
  };

  const stopVideoAndAudio = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => {
      if (track.readyState == "live") {
        track.stop();
      }
    });
  }, [streamRef.current]);

  const stopAudio = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => {
      if (track.readyState == "live" && track.kind === "audio") {
        track.stop();
      }
    });
  }, [streamRef.current]);

  const stopVideo = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => {
      if (track.readyState == "live" && track.kind === "video") {
        track.stop();
      }
    });
  }, [streamRef.current]);

  const enableCamera = async (): Promise<void> => {
    if (streamRef.current) {
      console.log("enable cam");
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const newVideoTrack = newStream.getVideoTracks()[0];
      const oldVideoTrack = streamRef.current.getVideoTracks()[0];
      if (oldVideoTrack) {
        streamRef.current.removeTrack(oldVideoTrack);
        oldVideoTrack.stop();
      }
      streamRef.current.addTrack(newVideoTrack);
      peerRef.current?.replaceTrack(
        oldVideoTrack,
        newVideoTrack,
        streamRef.current
      ); // Thay thế trong peer (nếu hỗ trợ)
    }
  };

  //const exitCall = (): void => {};

  const exitCall = useCallback(() => {
    console.log("exit call");
    setUserPeer(null);
    peerRef.current?.destroy();
    setSignalData(null);
    stopVideoAndAudio();
    // const tracks = streamRef.current?.getTracks();
    // tracks?.forEach((track) => {
    //   track.stop();
    // });
    router.push("/");
    streamRef.current = null;
  }, [streamRef.current, peerRef.current]);

  useEffect(() => {
    if (peerRef.current) {
      setUserPeer(peerRef.current);
      console.log("set userPeer", peerRef.current);
    }
  }, [peerRef.current]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log("user close or reload");
      exitCall();
    };
    const handlePopState = () => {
      console.log("User pressed back button");
      exitCall();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.history.pushState(null, "", document.URL);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return {
    callStatus,
    localVideoRef,
    remoteVideoRef,
    initiateCallerPeer,
    initiateCalleePeer,
    muteMic,
    unmuteMic,
    disableCamera,
    enableCamera,
    exitCall,
  };
};

export { usePeer };
