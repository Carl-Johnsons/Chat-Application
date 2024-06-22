"use client";

import { AxiosProvider, ChatHubProvider } from "@/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import userManager from "./oidc-client";

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
      </AxiosProvider>
    </QueryClientProvider>
  );
};
export default Providers;
