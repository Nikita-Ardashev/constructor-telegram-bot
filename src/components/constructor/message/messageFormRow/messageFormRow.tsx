import { memo, ReactNode } from 'react';
import MessageAction from '../messageAction/messageAction';
import styles from './messageFormRow.module.sass';
import DropdownConstructorButtons from '../../dropdownConstructorButtons/dropdownConstructorButtons';
import { Instance } from 'mobx-state-tree';
import { ConstructorChatMessageModel } from '@/stores/constructor/constructor';

export default memo(function MessageFormRow(
	props: Instance<typeof ConstructorChatMessageModel>,
) {
	return (
		<div className={styles.message_form_row}>
			<p>Выбор кнопки 1 пользователем, выводит:</p>
			<div>
				<MessageAction
					label="Начальный текст"
					fieldText={props.result.text}
					isCheck={false}
				/>
				<MessageAction
					label=""
					fieldText={''}
					isCheck={false}
					additionChildren={[
						<DropdownConstructorButtons
							key={'DropdownConstructorButtons'}
							messageIds={props.result.childrenIds}
						/>,
					]}
				/>
			</div>
		</div>
	);
});
