import { BoardModel, ConstructorTemporaryStorageModel } from './model';

export const BoardStore = BoardModel.create({
	nodes: {
		'1': {
			id: '1',
			position: { x: 0, y: 0 },
			data: { label: 'Hello' },
			type: 'input',
		},
		'2': {
			id: '2',
			position: { x: 200, y: 100 },
			data: { label: '1' },
		},
		'3': {
			id: '3',
			position: { x: 0, y: 100 },
			data: { label: '2' },
		},
		'4': {
			id: '4',
			position: { x: -200, y: 100 },
			data: { label: '3' },
		},
	},

	edges: {
		'1-2': { id: '1-2', source: '1', target: '2', label: 'step 1', type: 'step' },
		'1-3': { id: '1-3', source: '1', target: '3', label: 'step 2', type: 'step' },
		'1-4': { id: '1-4', source: '1', target: '4', label: 'step 3', type: 'step' },
	},
});

export const ConstructorTemporaryStore = ConstructorTemporaryStorageModel.create({
	board: [
		{
			nodes: {
				'1': {
					id: '1',
					position: { x: 0, y: 0 },
					data: { label: 'Hello' },
					type: 'input',
				},
				'2': {
					id: '2',
					position: { x: 200, y: 100 },
					data: { label: '1' },
				},
				'3': {
					id: '3',
					position: { x: 0, y: 100 },
					data: { label: '2' },
				},
				'4': {
					id: '4',
					position: { x: -200, y: 100 },
					data: { label: '3' },
				},
			},
			edges: {
				'1-2': {
					id: '1-2',
					source: '1',
					target: '2',
					label: 'step 1',
					type: 'step',
				},
				'1-3': {
					id: '1-3',
					source: '1',
					target: '3',
					label: 'step 2',
					type: 'step',
				},
				'1-4': {
					id: '1-4',
					source: '1',
					target: '4',
					label: 'step 3',
					type: 'step',
				},
			},
		},
	],
});
