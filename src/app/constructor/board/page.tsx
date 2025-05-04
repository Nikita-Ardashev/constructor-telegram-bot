'use client';

import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	Connection,
	Controls,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import styles from './page.module.sass';
import { useState, useCallback } from 'react';

const initialNodes: Node[] = [
	{
		id: '1',
		position: { x: 0, y: 0 },
		data: { label: 'Hello' },
		type: 'input',
	},
	{
		id: '2',
		position: { x: 100, y: 100 },
		data: { label: 'World' },
	},
];

const initialEdges: Edge[] = [
	{ id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
];

const Board = () => {
	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);

	const onNodesChange = useCallback(
		(changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[],
	);
	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[],
	);

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds) => addEdge(params, eds)),
		[],
	);
	return (
		<div className={styles.board}>
			<ReactFlow
				nodes={nodes}
				onNodesChange={onNodesChange}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<Background bgColor="white" />
				<Controls />
			</ReactFlow>
		</div>
	);
};

export default Board;
