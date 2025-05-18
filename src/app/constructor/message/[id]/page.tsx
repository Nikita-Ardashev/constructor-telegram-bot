'use client';

import { observer } from 'mobx-react-lite';
import React, { memo } from 'react';
import styles from './page.module.sass';
import ConstructorButton from '@/components/constructor/constructorButton/constructorButton';
import { useParams } from 'next/navigation';
import MessageFormRow from '@/components/constructor/message/messageFormRow/messageFormRow';
import { ConstructorStore } from '@/stores/constructor/store';

export default memo(
	observer(function Message() {
		const params: { id: string } = useParams();
		const step = ConstructorStore.get('step');
		const message = ConstructorStore.get('messages')[step].getMessage(params.id);
		return (
			<div className={styles.setting_button}>
				<div>
					<h1></h1>
				</div>
				<ConstructorButton id={params.id} isToSettings={false}>
					{params.id}
				</ConstructorButton>
				<MessageFormRow {...message!} />
			</div>
		);
	}),
);
