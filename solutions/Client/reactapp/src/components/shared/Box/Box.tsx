import { CSSProperties } from "react";
interface Props {
  children: React.ReactNode;
  style?: CSSProperties;
}

const Box = ({ children, style }: Props) => {
  return <div style={{ ...style }}>{children}</div>;
};
export default Box;
