import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";
import "./index.scss"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zalo",
  description: "A platform that enable high communication...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
