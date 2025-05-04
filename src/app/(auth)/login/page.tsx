'use client';

import { ProfileStore } from '@/stores/profile/store';
import { signIn, signOut, useSession } from 'next-auth/react';

import styles from './page.module.sass';
import { OAuthProviderType } from 'next-auth/providers/oauth-types';

const onAuth = (provider: OAuthProviderType) => {
	signIn(provider, { callbackUrl: '/login' });
};

const onLeave = () => {
	signOut({ redirect: true, callbackUrl: '/login' });
};

export default function Login() {
	const profile = ProfileStore.getProfile;
	const session = useSession();
	ProfileStore.setProfile(session);
	return (
		<div className={styles.login}>
			<p>{profile.name}</p>
			<p>{profile.email}</p>
			{profile.email !== null ? (
				<button onClick={onLeave}>
					<p>Выйти</p>
				</button>
			) : (
				<>
					<button
						onClick={() => {
							onAuth('google');
						}}
					>
						<p>Авторизация с помощью Google</p>
					</button>
					<button
						onClick={() => {
							onAuth('yandex');
						}}
					>
						<p>Авторизация с помощью Yandex</p>
					</button>
				</>
			)}
		</div>
	);
}
