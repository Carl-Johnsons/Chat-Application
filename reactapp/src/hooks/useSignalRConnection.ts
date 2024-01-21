import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect } from "react";
import { useGlobalState } from "../GlobalState";

const useSignalRConnection = (hubURL: string) => {
  const [connection, setConnection] = useGlobalState("connection");
  useEffect(() => {
    async function startConnection() {
      const conn = new HubConnectionBuilder()
        .withUrl(hubURL)
        .configureLogging(LogLevel.Information)
        .build();
      await conn.start().catch((err) => console.error(err));


      setConnection(conn);
    }
    startConnection();
    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);
};

export default useSignalRConnection;
