import { useCallback, useEffect, useRef, useState } from "react";
import Peer, { SignalData } from "simple-peer";
import { signalRAcceptCall, signalRSendCallSignal, useGlobalState, useSignalREvents } from "@/hooks";
import { CALL_STATUS } from "../data/constants";
import { useRouter } from "next/navigation";

type InitCallerPeerProps = { conversationId?: string, stream: MediaStream }

type InitCalleePeerProps = { conversationId?: string, stream: MediaStream, callerSignalData: SignalData }

const usePeer = () => {
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const { invokeAction, connected: signalRConnected } = useSignalREvents();
    const [, setSignalData] = useGlobalState("signalData");
    const [, setUserPeer] = useGlobalState("userPeer");
    const peerRef = useRef<Peer.Instance | null>(null);
    const [callStatus, setCallStatus] = useState(CALL_STATUS.PREPARING);
    const router = useRouter();
    const initiateCallerPeer = useCallback(({ conversationId, stream }: InitCallerPeerProps) => {

        if (!signalRConnected) {
            console.log("signalR not connected");
            return;
        }
        console.log("signalR connected");



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
            console.log("send signal caller*****************************", remoteVideoRef)
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
            console.log("send steam caller*****************************")
            if (remoteVideoRef.current && remoteVideoRef.current.srcObject !== stream) {
                remoteVideoRef.current.srcObject = stream;
            }
            remoteVideoRef.current?.play();
        });
        peer.on('connect', () => {
            setCallStatus(CALL_STATUS.CONNECTED);
        });
        peer.on('close', () => {
            setCallStatus(CALL_STATUS.EXITED);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = null;
            }
        });
        peer.on('error', () => {
            console.log("Callee error");
            setCallStatus(CALL_STATUS.EXITED);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = null;
            }
        });
        return peer;
    }, [signalRConnected]);

    const initiateCalleePeer = useCallback(({ callerSignalData, stream, conversationId }: InitCalleePeerProps) => {
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
                invokeAction(signalRAcceptCall({ signalData: JSON.stringify(signalData), targetConversationId: conversationId }))
            }
        });
        peer.on("stream", (stream) => {
            setCallStatus(CALL_STATUS.CONNECTING);
            console.log("send steam callee*****************************", remoteVideoRef, remoteVideoRef.current)
            if (remoteVideoRef.current) {
                console.log("ok steam callee");
                remoteVideoRef.current.srcObject = stream;
            }
            remoteVideoRef.current?.play();
        });
        peer.on('connect', () => {
            setCallStatus(CALL_STATUS.CONNECTED);
        });
        peer.on('close', () => {
            setCallStatus(CALL_STATUS.EXITED);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = null;
            }
        });
        peer.on('error', () => {
            console.log("Caller error");
            setCallStatus(CALL_STATUS.EXITED);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = null;
            }
        });
        console.log("caller sigaldata", callerSignalData)
        console.log("peer 2 signal peer 1")
        peer.signal(callerSignalData);
        return peer;
    }, []);

    const muteMic = (stream: MediaStream): void => {
        console.log("enable mic");
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = false; // Tắt mic
    };

    const unmuteMic = (stream: MediaStream): void => {
        console.log("dis mic");
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = true; // Bật mic
    };

    const disableCamera = (stream: MediaStream): void => {
        console.log("dis cam");
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = false;
            setTimeout(() => {
                videoTrack.stop();
            }, 100);
        }
    };

    const enableCamera = async (stream: MediaStream): Promise<void> => {
        console.log("enable cam");
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

    const exitCall = () => {
        console.log("exit call");
        peerRef.current?.destroy();
        setUserPeer(null);
        setSignalData(null);
        const tracks = streamRef.current?.getTracks();
        tracks?.forEach(track => {
            track.stop();
        });
        router.push("/");
    }

    useEffect(() => {
        if (peerRef.current) {
            setUserPeer(peerRef.current);
            console.log("set userPeer", peerRef.current);
        }
    }, [peerRef.current]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            console.log('Người dùng đóng tab hoặc làm mới trang.');
            exitCall();
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // useEffect(() => {
    //     const handleRouteChange = () => {
    //         console.log('Back button was pressed or route changed');
    //         exitCall();
    //     };

    //     router.beforePopState(() => {
    //         handleRouteChange();
    //         return true; // Allow the route change
    //     });

    //     return () => {
    //         router.beforePopState(() => true); // Cleanup
    //     };
    // }, [router]);

    return { callStatus, localVideoRef, remoteVideoRef, initiateCallerPeer, initiateCalleePeer, muteMic, unmuteMic, disableCamera, enableCamera, exitCall }

};

export { usePeer };


