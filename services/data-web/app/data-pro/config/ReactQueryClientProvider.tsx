'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const queryClient = new QueryClient({});

export default function ReactQueryClientProvider({ children }: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}