import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./global.scss";
import "./index.scss";

import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Zalo",
  description: "A platform that enable high communication...",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Providers> {children}</Providers>
        </div>
      </body>
    </html>
  );
};
export default RootLayout;
