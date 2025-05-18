'use client';

import React, { ButtonHTMLAttributes, memo, useCallback } from 'react';
import styles from './constructorButton.module.sass';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { ConstructorStore } from '@/stores/constructor/store';

interface IConstructorButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	id: string;
	isToSettings?: boolean;
}

export default memo(
	observer(function ConstructorButton({
		isToSettings = true,
		id,
		...buttonProps
	}: IConstructorButton) {
		const router = useRouter();
		const toSettingsButton = useCallback(() => {
			router.push('/constructor/message/' + id);
		}, [router, id]);
		const step = ConstructorStore.get('step');
		const message = ConstructorStore.get('messages')[step].getMessage(id);

		return (
			<button
				{...buttonProps}
				className={styles.button + ' ' + buttonProps.className}
				onDoubleClick={isToSettings ? toSettingsButton : undefined}
			>
				{message?.label}
			</button>
		);
	}),
);
