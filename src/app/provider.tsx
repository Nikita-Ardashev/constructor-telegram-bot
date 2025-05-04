'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfileStore } from '@/stores/profile/store';
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	const { expires, apiKey, ...user } = ProfileStore.getProfile;
	const session = expires === null ? null : { expires: expires.toString(), user };
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>{children}</SessionProvider>
		</QueryClientProvider>
	);
}
