import DefaultCheckBox from '@/components/ui/defaultCheckBox/defaultCheckBox';
import DefaultField from '@/components/ui/defaultFields/defaultField';
import React, { HTMLAttributes, ReactNode } from 'react';
import styles from './messageAction.module.sass';

interface IMessageAction extends HTMLAttributes<HTMLDivElement> {
	fieldText: string;
	isCheck: boolean;
	label: string;
	additionChildren?: ReactNode[];
}

export default function MessageAction(props: IMessageAction) {
	const { fieldText, isCheck, label, additionChildren, ...wrapperProps } = props;
	return (
		<div className={styles.message_action} {...wrapperProps}>
			<p>{props.label}</p>
			<DefaultCheckBox label={'Текст'} isCheck={isCheck} />
			<DefaultField
				inputProps={{ placeholder: 'Введите текст', defaultValue: fieldText }}
			/>
			{additionChildren && additionChildren.map((c) => c)}
		</div>
	);
}
