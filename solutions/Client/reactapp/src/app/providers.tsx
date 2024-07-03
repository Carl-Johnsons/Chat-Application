"use client";

import { AxiosProvider, ChatHubProvider } from "@/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import userManager from "./oidc-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "react-image-gallery/styles/css/image-gallery.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false, // default: true
      retry: 1,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const path = usePathname();
  const currentPath = path;

  // Define the route you want to exclude
  const excludeSignalRContext: string[] = [];
  // Check if the current route is in the exclude list
  const isExcluded = excludeSignalRContext.some((route) =>
    currentPath.startsWith(route)
  );

  // Removes stale state entries in storage for incomplete authorize requests.
  userManager.clearStaleState();

  return (
    <QueryClientProvider client={queryClient}>
      <AxiosProvider>
        {isExcluded ? children : <ChatHubProvider>{children}</ChatHubProvider>}
        <ReactQueryDevtools />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AxiosProvider>
    </QueryClientProvider>
  );
};
export default Providers;
