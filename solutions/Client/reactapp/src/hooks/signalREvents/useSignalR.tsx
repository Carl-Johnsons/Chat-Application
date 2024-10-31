import { ChatHubContext } from "contexts/ChatHubContext";
import { useContext } from "react";

const useSignalR = () => {
  const context = useContext(ChatHubContext);
  if (!context) {
    throw new Error("useSignalREvents must be used within ChatHubProvider");
  }
  return context;
};

export { useSignalR };
