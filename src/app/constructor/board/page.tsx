'use client';

import {
	Background,
	Connection,
	Controls,
	EdgeChange,
	NodeChange,
	ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import styles from './page.module.sass';
import { useCallback, memo } from 'react';
import { BoardStore, ConstructorTemporaryStore } from '@/stores/constructor/store';
import { observer } from 'mobx-react-lite';
import { useHotkeys } from 'react-hotkeys-hook';

export default memo(
	observer(function Board() {
		const initialNodes = BoardStore.getNodesArray;
		const initialEdges = BoardStore.getEdgesArray;

		const onNodesChange = useCallback(
			(changes: NodeChange[]) => BoardStore.updateNodes(changes),
			[],
		);
		const onEdgesChange = useCallback(
			(changes: EdgeChange[]) => BoardStore.updateEdges(changes),
			[],
		);
		const onConnect = useCallback(
			(params: Connection) => BoardStore.addConnect(params),
			[],
		);

		const undo = useCallback((e: KeyboardEvent) => {
			ConstructorTemporaryStore.addNode('chat', '1234');
		}, []);
		const redo = useCallback((e: KeyboardEvent) => {
			ConstructorTemporaryStore.removeNode('chat');
		}, []);

		useHotkeys('ctrl+z, cmd+z', undo, { preventDefault: true });
		useHotkeys('ctrl+shift+z, cmd+shift+z', redo, { preventDefault: true });

		return (
			<div className={styles.board}>
				<ReactFlow
					nodes={initialNodes}
					onNodesChange={onNodesChange}
					edges={initialEdges}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
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
