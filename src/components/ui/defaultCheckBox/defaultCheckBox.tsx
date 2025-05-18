'use client';

import React, {
	ButtonHTMLAttributes,
	HTMLAttributes,
	LabelHTMLAttributes,
	ReactNode,
	useCallback,
	useState,
} from 'react';
import styles from './defaultCheckBox.module.sass';
import { ReactSVG } from 'react-svg';
import { z } from 'zod';
interface IDefaultCheckBox {
	btnProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;
	labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'>;
	parProps?: Omit<HTMLAttributes<HTMLParagraphElement>, 'children'>;
}

const ZDefaultCheckBox = z.intersection(
	z.custom<IDefaultCheckBox>(),
	z.object({
		iconCheck: z
			.string()
			.regex(/[.]+svg/gm)
			.default('/svg/icon-checkbox.svg'),
		label: z.string().or(z.custom<ReactNode>()),
		isCheck: z.boolean().default(false),
	}),
);

export default function DefaultCheckBox(props: z.input<typeof ZDefaultCheckBox>) {
	props = ZDefaultCheckBox.parse(props);
	const [isActive, setIsActive] = useState(props.isCheck);

	const handlerClick = useCallback(() => {
		setIsActive((v) => !v);
	}, []);

	return (
		<label
			{...props.labelProps}
			className={styles.default_checkbox + ' ' + props.btnProps?.className}
		>
			<button {...props.btnProps} onClick={handlerClick}>
				{<ReactSVG src={isActive ? props.iconCheck! : ''} />}
			</button>
			{typeof props.label === 'string' ? (
				<p {...props.parProps}>{props.label}</p>
			) : (
				props.label
			)}
		</label>
	);
}
