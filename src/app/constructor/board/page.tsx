'use client';

import { Background, Controls, Edge, Node, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import styles from './page.module.sass';
import { memo } from 'react';
import { observer } from 'mobx-react-lite';

const initialNodes: Node[] = [
	{
		id: '1',
		position: { x: 0, y: 0 },
		data: { label: 'Hello' },
		type: 'input',
	},
	{
		id: '2',
		position: { x: 200, y: 100 },
		data: { label: '1' },
	},
	{
		id: '3',
		position: { x: 0, y: 100 },
		data: { label: '2' },
	},
	{
		id: '4',
		position: { x: -200, y: 100 },
		data: { label: '3' },
	},
];
const initialEdges: Edge[] = [
	{ id: '1-2', source: '1', target: '2', label: 'step 1', type: 'step' },
	{ id: '1-3', source: '1', target: '3', label: 'step 2', type: 'step' },
	{ id: '1-4', source: '1', target: '4', label: 'step 3', type: 'step' },
];
export default memo(
	observer(function Board() {
		return (
			<div className={styles.board}>
				<ReactFlow
					nodes={initialNodes}
					edges={initialEdges}
					fitView
					deleteKeyCode={null}
					selectionKeyCode={null}
					multiSelectionKeyCode={null}
				>
					<Background bgColor="white" />
					<Controls>
						<button>t</button>
					</Controls>
				</ReactFlow>
			</div>
		);
	}),
);
