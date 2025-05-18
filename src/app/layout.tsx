import type { Metadata } from 'next';
import { Providers } from './provider';
import '@/styles/global.sass';
import Header from '@/components/ui/header/header';

export const metadata: Metadata = {
	title: 'КоТеБот',
	description: 'Конструктор телеграм ботов',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body>
				<Providers>
					<Header />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
