import "./GlobalStyle.scss";

interface Props {
  children: React.ReactNode;
}

const GlobalStyle = ({ children }: Props) => {
  return <>{children}</>;
};

export default GlobalStyle;
