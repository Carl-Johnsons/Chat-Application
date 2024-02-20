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
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  );
}
