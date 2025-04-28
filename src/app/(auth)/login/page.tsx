'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import styled from 'styled-components';

const DivLogin = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	gap: 32px;
`;

const Btn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px;
	border-radius: 12px;
	width: 50%;
	cursor: pointer;
	background: black;
	color: white;
	transition: 0.4s;
	&:hover {
		opacity: 0.6;
	}
`;

const onAuth = () => {
	signIn('google', { callbackUrl: '/' });
};

const onLeave = () => {
	signOut({ redirect: true, callbackUrl: '/' });
};

export default function Login() {
	const session = useSession();
	console.log(session);

	return (
		<DivLogin>
			<h1></h1>
			<p></p>
			<Btn onClick={onAuth}>
				<p>Google</p>
			</Btn>
			<Btn onClick={onLeave}>
				<p>Выйти</p>
			</Btn>
		</DivLogin>
	);
}
