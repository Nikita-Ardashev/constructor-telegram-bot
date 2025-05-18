'use client';
import { InputHTMLAttributes, LabelHTMLAttributes, lazy, memo, ReactElement } from 'react';
import styles from './defaultField.module.sass';
import { z } from 'zod';
import { observer } from 'mobx-react-lite';
import { ReactSVG } from 'react-svg';

interface IDefaultField {
	isReversed?: boolean;
	title?: string;
	errorText?: string;
	icon?: ReactElement<ReactSVG>;
	inputProps?: InputHTMLAttributes<HTMLInputElement>;
	labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
	callback?: () => void;
}

export default memo(
	observer(function DefaultField({ isReversed = false, ...props }: IDefaultField) {
		return (
			<label className={styles.default_field} {...props.labelProps}>
				{props.title && <p>{props.title}</p>}
				<div style={{ flexDirection: isReversed ? 'row-reverse' : undefined }}>
					{props.icon}
					<input {...props.inputProps} />
				</div>
				{props.errorText && <p>{props.errorText}</p>}
			</label>
		);
	}),
);
