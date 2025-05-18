'use client';

import DefaultField from '@/components/ui/defaultFields/defaultField';
import React, { memo, useState } from 'react';
import styles from './dropdownConstructorButtons.module.sass';
import { observer } from 'mobx-react-lite';
import { ConstructorStore } from '@/stores/constructor/store';
import ConstructorButton from '../constructorButton/constructorButton';
import DefaultCheckBox from '@/components/ui/defaultCheckBox/defaultCheckBox';
import { ReactSVG } from 'react-svg';

interface IDropdownConstructorButtons {
	messageIds: string[];
}

export default memo(
	observer(function DropdownConstructorButtons(props: IDropdownConstructorButtons) {
		const step = ConstructorStore.get('step');
		const messages = ConstructorStore.get('messages')[step].getMessages.filter((m) =>
			props.messageIds.some((id) => id === m.id),
		);

		const [isActive, setIsActive] = useState(false);
		const [searchValue, setSearchValue] = useState('');

		return (
			<div className={styles.dropdown_constructor_buttons}>
				<DefaultField
					inputProps={{
						placeholder: 'Введите название кнопки',
						defaultValue: searchValue,
						onChange: (e) => {
							setSearchValue(e.currentTarget.value.trim().toLowerCase());
						},
					}}
					icon={<ReactSVG src="/svg/icon-search-sort.svg" />}
					isReversed
				/>
				<div className={styles.dropdown}>
					{messages.map((m) => (
						<DefaultCheckBox
							key={m.id}
							label={<ConstructorButton id={m.id} />}
						/>
					))}
				</div>
			</div>
		);
	}),
);
