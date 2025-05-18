import { SnapshotOut } from 'mobx-state-tree';
import { ConstructorModel } from './model';

const MESSAGES: SnapshotOut<typeof ConstructorModel.properties.messages> = [
	{
		messages: {
			'1': {
				id: '1',
				label: 'first',
				text: 'button 1',
				result: { childrenIds: ['2'], text: 'result' },
			},
			'2': {
				id: '2',
				label: 'second',
				text: 'button 2',
				result: { childrenIds: ['1', '3'], text: 'result' },
			},
			'3': {
				id: '3',
				label: 'third',
				text: 'button 3',
				result: { childrenIds: ['1'], text: 'result' },
			},
		},
	},
];

export const ConstructorStore = ConstructorModel.create({ messages: MESSAGES, step: 0 });
