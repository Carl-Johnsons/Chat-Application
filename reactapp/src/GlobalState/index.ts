import { User } from "./../Models/User";
import { createGlobalState } from "react-hooks-global-state";

const { useGlobalState, setGlobalState } = createGlobalState({
  user: null as unknown as User,
});

export { useGlobalState, setGlobalState };
