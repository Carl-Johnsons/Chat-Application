"use client";
import React, { useEffect, useRef, useState } from "react";
import { useGlobalState, usePeer } from "@/hooks";

const VideoCall: React.FC = () => {
  const streamRef = useRef<MediaStream | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [signalData] = useGlobalState("signalData");
  const [userPeer] = useGlobalState("userPeer");
  const [activeConversationId] = useGlobalState("activeConversationId");
  const { callStatus, remoteVideoRef, localVideoRef, initiateCallerPeer, initiateCalleePeer, muteMic, unmuteMic, enableCamera, disableCamera } = usePeer();
  console.log("call status", callStatus);
  const handleToggleMic = () => {
    if (streamRef.current) {
      if (isMicOn) {
        muteMic(streamRef.current);
      } else {
        unmuteMic(streamRef.current);
      }
      setIsMicOn(!isMicOn);
    }
  };

  const handleToggleCamera = () => {
    if (streamRef.current) {
      if (isCameraOn) {
        disableCamera(streamRef.current);
      } else {
        enableCamera(streamRef.current);
      }
      setIsCameraOn(!isCameraOn);
    }
  };


  useEffect(() => {
    const startVideoCall = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;

      if (userPeer) return;

      if (signalData) {
        console.log("create callee peer********************************");
        initiateCalleePeer({ callerSignalData: signalData, stream, conversationId: activeConversationId })
      } else {
        console.log("create caller peer*******************************");
        initiateCallerPeer({ conversationId: activeConversationId, stream })
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
        <button onClick={handleToggleMic}>{isMicOn ? 'Tắt Mic' : 'Bật Mic'}</button>
        <button onClick={handleToggleCamera}>{isCameraOn ? 'Tắt Camera' : 'Bật Camera'}</button>
        <h1>Status: {callStatus}</h1>
      </div>
    </div>
  );
};

export default VideoCall;
