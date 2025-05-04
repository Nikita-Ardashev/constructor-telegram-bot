import NextAuth, { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import Yandex from 'next-auth/providers/yandex';

export const authOptions: NextAuthOptions = {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_SECRET_ID as string,
		}),
		Yandex({
			clientId: process.env.YANDEX_CLIENT_ID as string,
			clientSecret: process.env.YANDEX_SECRET_ID as string,
			authorization: {
				params: {
					scope: 'login:email',
				},
			},
		}),
	],

	secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
