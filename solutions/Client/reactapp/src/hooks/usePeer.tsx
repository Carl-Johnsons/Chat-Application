import { useCallback, useEffect, useRef } from "react";
import Peer, { SignalData } from "simple-peer";
import { signalRAcceptCall, signalRSendCallSignal, useGlobalState, useSignalREvents } from "@/hooks";

type InitCallerPeerProps = { conversationId?: string, stream?: MediaStream }

type InitCalleePeerProps = { conversationId?: string, stream?: MediaStream, callerSignalData: SignalData }

const usePeer = () => {
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const { invokeAction } = useSignalREvents();
    const [, setSignalData] = useGlobalState("signalData");
    const [userPeer, setUserPeer] = useGlobalState("userPeer");
    const peerRef = useRef<Peer.Instance | null>(null);

    const initiateCallerPeer = useCallback(({ conversationId, stream }: InitCallerPeerProps) => {
        const peer = new Peer({
            initiator: true, // Adjust as necessary, can be set based on context
            trickle: false,
            stream,
        });

        peerRef.current = peer;
        peer.on("signal", (signalData) => {
            console.log("set signal caller");
            setSignalData(signalData);
            console.log("send signal caller*****************************", remoteVideoRef)
            const data = JSON.stringify(signalData);
            if (conversationId) {
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

    useEffect(() => {
        if (peerRef.current) {
            setUserPeer(peerRef.current);
            console.log("set userPeer", peerRef.current);
        }
    }, [peerRef.current]);

    useEffect(() => {
        console.log("userPeer changed", userPeer);
    }, [userPeer]);

    return { remoteVideoRef, initiateCallerPeer, initiateCalleePeer }

};

export { usePeer };


