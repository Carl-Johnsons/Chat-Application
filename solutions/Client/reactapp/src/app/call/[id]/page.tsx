"use client";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer, { SignalData } from "simple-peer";

const CallPage = () => {
  const [incomingData, setIsncomingData] = useState();
  const [outGoingData, setOutGoingData] = useState();
  const params = useParams();
  const Id = params["id"];
  const videoRef = useRef<HTMLVideoElement>(null); // Create a ref for the video element

  // This allows you to determine whether the microphone and camera are ready for use.
  navigator.mediaDevices.enumerateDevices().then(function (devices) {
    devices.forEach(function (device) {
      console.log(
        device.kind + ": " + device.label + " id = " + device.deviceId
      );
    });
  });
  let p: SimplePeer.Instance | undefined;

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // p = new SimplePeer({
      //   initiator: location.hash === "#1",
      //   trickle: false,
      //   stream,
      // });
      // p.on("error", (err) => console.error("error", err));
      // p.on("signal", (data) => {
      //   console.log("SIGNAL", JSON.stringify(data));
      //   setOutGoingData(JSON.stringify(data));
      // });

      // p.on("connect", () => {
      //   console.log("CONNECT");
      //   p?.send("whatever" + Math.random()); // Or Files
      // });

      // p.on("data", (data) => {
      //   console.log("data: " + data);
      // });
      // p.on("stream", function (stream) {
      //   console.log("stream");

      //   if (videoRef.current && stream) {
      //     videoRef.current.srcObject = stream;
      //     videoRef.current.play().catch((error) => {
      //       console.error("Error attempting to play", error);
      //     });
      //   }
      // });
    });

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      p?.signal(incomingData);
    },
    [incomingData, p]
  );

  return (
    <div>
      Call {Id}
      <form>
        <textarea id="incoming"></textarea>
        <button type="submit" onClick={(e) => handleSubmit(e)}>
          submit
        </button>
      </form>
      <pre>{outGoingData}</pre>
      <video ref={videoRef}></video>
    </div>
  );
};

export default CallPage;
