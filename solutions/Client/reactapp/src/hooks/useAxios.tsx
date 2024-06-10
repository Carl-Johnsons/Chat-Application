import { AxiosContext } from "@/contexts";
import { useContext } from "react";

const useAxios = () => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxios must be used within a AxiosProvider");
  }
  return context;
};

export { useAxios };
