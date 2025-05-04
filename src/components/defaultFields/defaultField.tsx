'use client';
import {
	DOMAttributes,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	memo,
	ReactElement,
	useMemo,
} from 'react';
import { ReactSVG } from 'react-svg';
import styles from '@styles/components/defaultField.module.sass';
import { z } from 'zod';
import { observer } from 'mobx-react-lite';

type GlobalEventHandlersKeys = keyof GlobalEventHandlers;

type EventHandlerKeys = {
	[K in GlobalEventHandlersKeys]: K extends `on${string}` ? K : never;
}[GlobalEventHandlersKeys];

const ZDefaultField = z.object({
	isReversed: z.boolean().default(false),
	title: z.optional(z.string()),
	errorText: z.string().optional(),
	icon: z.optional(
		z.union([z.string().regex(/[.]+svg/gm), z.custom<ReactElement<ReactSVG>>()]),
	),
	inputProps: z.optional(z.custom<InputHTMLAttributes<HTMLInputElement>>()),
	labelProps: z.optional(z.custom<LabelHTMLAttributes<HTMLLabelElement>>()),
	callback: z.optional(z.function().args(z.string())),
});

export default memo(
	observer(function DefaultField(props: z.input<typeof ZDefaultField>) {
		props = ZDefaultField.parse(props);
		const Icon = useMemo(() => {
			const icon = props.icon;
			if (icon === undefined) return null;
			if (typeof icon === 'string') {
				return <ReactSVG src={icon} />;
			}
			return icon;
		}, [props.icon]);
		return (
			<label className={styles.default_field} {...props.labelProps}>
				{props.title && <p>{props.title}</p>}
				<div
					style={{ flexDirection: props.isReversed ? 'row-reverse' : undefined }}
				>
					{Icon}
					<input {...props.inputProps} />
				</div>
				{props.errorText && <p>{props.errorText}</p>}
			</label>
		);
	}),
);
