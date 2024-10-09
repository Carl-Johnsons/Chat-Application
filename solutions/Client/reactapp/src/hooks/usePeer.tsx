import { useCallback, useEffect, useRef, useState } from "react";
import Peer, { SignalData } from "simple-peer";
import { signalRAcceptCall, signalRSendCallSignal, useGlobalState, useSignalREvents } from "@/hooks";

type InitCallerPeerProps = { conversationId?: string, stream: MediaStream }

type InitCalleePeerProps = { conversationId?: string, stream?: MediaStream, callerSignalData: SignalData }

const usePeer = () => {
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const { invokeAction } = useSignalREvents();
    const [, setSignalData] = useGlobalState("signalData");
    const [, setUserPeer] = useGlobalState("userPeer");
    const peerRef = useRef<Peer.Instance | null>(null);
    const [callStatus, setCallStatus] = useState("");




    const initiateCallerPeer = useCallback(({ conversationId, stream }: InitCallerPeerProps) => {
        streamRef.current = stream;

        const peer = new Peer({
            initiator: true, // Adjust as necessary, can be set based on context
            trickle: false,
            stream,
        });
        setCallStatus("Đang kết nối...");

        peerRef.current = peer;
        peer.on("signal", (signalData) => {
            console.log("set signal caller");
            setSignalData(signalData);
            console.log("send signal caller*****************************", remoteVideoRef)
            const data = JSON.stringify(signalData);
            if (conversationId) {
                setCallStatus("Đang gọi...");
                invokeAction(
                    signalRSendCallSignal({
                        signalData: data,
                        targetConversationId: conversationId,
                    })
                );
            }
        });
        peer.on("stream", (stream) => {
            console.log("send steam caller*****************************")
            if (remoteVideoRef.current && remoteVideoRef.current.srcObject !== stream) {
                remoteVideoRef.current.srcObject = stream;
            }
            remoteVideoRef.current?.play();
        });
        return peer;
    }, []);

    const initiateCalleePeer = useCallback(({ callerSignalData, stream, conversationId }: InitCalleePeerProps) => {
        const peer = new Peer({
            initiator: false, // Adjust as necessary, can be set based on context
            trickle: false,
            stream,
        });
        peerRef.current = peer;
        setUserPeer(peer);
        console.log("global userpeer", peer);

        peer.on("signal", (signalData) => {
            if (conversationId) {
                console.log("invoke acceppCall to pair with caller peer");
                invokeAction(signalRAcceptCall({ signalData: JSON.stringify(signalData), targetConversationId: conversationId }))
            }
        });
        peer.on("stream", (stream) => {
            console.log("send steam callee*****************************", remoteVideoRef, remoteVideoRef.current)
            if (remoteVideoRef.current) {
                console.log("ok steam callee");
                remoteVideoRef.current.srcObject = stream;
            }
            remoteVideoRef.current?.play();
        });
        console.log("callersigaldata", callerSignalData)
        console.log("peer 2 signal peer 1")
        peer.signal(callerSignalData);
        return peer;
    }, []);

    const muteMic = (stream: MediaStream): void => {
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = false; // Tắt mic
    };

    const unmuteMic = (stream: MediaStream): void => {
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = true; // Bật mic
    };

    const disableCamera = (stream: MediaStream): void => {
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = false;
            //delay to set black remote video
            setTimeout(() => {
                videoTrack.stop();
            }, 100);
        }
    };

    const enableCamera = async (stream: MediaStream): Promise<void> => {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        const newVideoTrack = newStream.getVideoTracks()[0];
        const oldVideoTrack = stream.getVideoTracks()[0];
        if (oldVideoTrack) {
            stream.removeTrack(oldVideoTrack);
            oldVideoTrack.stop();
        }
        stream.addTrack(newVideoTrack);
        peerRef.current?.replaceTrack(oldVideoTrack, newVideoTrack, stream); // Thay thế trong peer (nếu hỗ trợ)

    };

    useEffect(() => {
        if (peerRef.current) {
            setUserPeer(peerRef.current);
            console.log("set userPeer", peerRef.current);
        }
    }, [peerRef.current]);

    return { callStatus, localVideoRef, remoteVideoRef, initiateCallerPeer, initiateCalleePeer, muteMic, unmuteMic, disableCamera, enableCamera }

};

export { usePeer };


