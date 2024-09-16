"use client";
import React, { useEffect, useRef } from "react";
import { useGlobalState, usePeer } from "@/hooks";



const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [activeConversationId] = useGlobalState("activeConversationId");
  const { initiateCallerPeer, remoteVideoRef, initiateCalleePeer } = usePeer();
  const [signalData] = useGlobalState("signalData");

  useEffect(() => {
    const startVideoCall = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (!signalData) {
        console.log("create caller peer*******************************");
        initiateCallerPeer({ conversationId: activeConversationId, stream })
      } else {
        console.log("create callee peer********************************");
        initiateCalleePeer({ callerSignalData: signalData, stream, conversationId: activeConversationId })
      }

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    }
    startVideoCall();
  }, []);

  return (
    <div>
      <h1>Video Call</h1>
      <div>
        <video ref={localVideoRef} autoPlay muted style={{ width: "300px" }} />
        <video ref={remoteVideoRef} autoPlay style={{ width: "300px" }} />
      </div>
    </div>
  );
};

export default VideoCall;
