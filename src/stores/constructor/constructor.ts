import { MSTMapToArray } from '@/utils/convertBetweenArrayMap';
import { SnapshotIn, t } from 'mobx-state-tree';

const ConstructorChatMessagesResult = t.model({
	childrenIds: t.array(t.string),
	text: t.string,
});

type TInputMessage = Omit<SnapshotIn<typeof ConstructorChatMessageModel>, 'id'>;

export const ConstructorChatMessageModel = t
	.model({
		id: t.identifier,
		label: t.string,
		result: ConstructorChatMessagesResult,
		text: t.string,
	})
	.actions((self) => ({
		edit(message: Partial<TInputMessage>) {
			Object.assign(self, message);
		},
	}));

export const ConstructorMessagesModel = t
	.model({
		messages: t.map(ConstructorChatMessageModel),
	})
	.views((self) => ({
		get getMessages() {
			return MSTMapToArray(self.messages);
		},
		getMessage(id: string) {
			return self.messages.get(id);
		},
	}))
	.actions((self) => ({
		addMessage(message: TInputMessage) {
			const id = crypto.randomUUID();
			const newMessage: SnapshotIn<typeof ConstructorChatMessageModel> = {
				id,
				...message,
			};
			self.messages.set(id, newMessage);
		},
		removeMessage(id: string) {
			self.messages.delete(id);
		},
		setMessages(messages: typeof self.messages) {
			self.messages.replace(messages);
		},
		mergeMessages(messages: typeof self.messages) {
			self.messages.merge(messages);
		},
	}));
