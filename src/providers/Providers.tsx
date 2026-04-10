"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/query-client";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<Toaster position="top-right" reverseOrder={false} />
		</QueryClientProvider>
	);
}
