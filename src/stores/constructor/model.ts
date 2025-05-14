import { ArrayWithObjectToMap, MapToArray } from '@/utils/convertBetweenArrayMap';
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Connection,
	EdgeChange,
	isEdge,
	isNode,
	NodeChange,
	type Edge,
	type Node,
} from '@xyflow/react';
import { SnapshotOut, t } from 'mobx-state-tree';

export const MSTFlowNode = t.custom<Node, Node>({
	name: 'Node',
	fromSnapshot(snapshot) {
		return snapshot;
	},
	toSnapshot(value) {
		return value;
	},
	isTargetType(value): boolean {
		return isNode(value);
	},
	getValidationMessage(snapshot) {
		return '';
	},
});

export const MSTFlowEdge = t.custom<Edge, Edge>({
	name: 'Edge',
	fromSnapshot(snapshot) {
		return snapshot;
	},
	toSnapshot(value) {
		return value;
	},
	isTargetType(value): boolean {
		return isEdge(value);
	},
	getValidationMessage(snapshot) {
		return '';
	},
});

export const BoardDataOnlyModel = t.model({
	nodes: t.map(MSTFlowNode),
	edges: t.map(MSTFlowEdge),
});

export const BoardModel = BoardDataOnlyModel.views((self) => ({
	get getNodesArray() {
		return MapToArray(self.nodes);
	},
	get getNodes() {
		return self.nodes;
	},
	getNodeById(id: string | number) {
		return self.nodes.get(id.toString());
	},
	get getEdgesArray() {
		return MapToArray(self.edges);
	},
	get getEdges() {
		return self.edges;
	},
	getEdgeById(id: string | number) {
		return self.edges.get(id.toString());
	},
})).actions((self) => ({
	addNode(node: Node) {
		self.nodes.set(node.id, node);
	},
	updateNode(updatedNode: Partial<Node>) {
		self.nodes.merge(updatedNode);
	},
	updateNodes(changes: NodeChange[]) {
		const nodes = ArrayWithObjectToMap(
			applyNodeChanges(changes, MapToArray(self.nodes)),
		);
		self.nodes.merge(nodes);
	},
	removeNode(node: Node) {
		self.nodes.delete(node.id);
	},
	addEdge(edge: Edge) {
		self.edges.set(edge.id, edge);
	},
	updateEdge(updatedEdge: Partial<Edge>) {
		self.edges.merge(updatedEdge);
	},
	updateEdges(changes: EdgeChange[]) {
		const edges = ArrayWithObjectToMap(
			applyEdgeChanges(changes, MapToArray(self.edges)),
		);
		self.edges.merge(edges);
	},
	removeEdge(edge: Edge) {
		self.edges.delete(edge.id);
	},
	addConnect(params: Connection) {
		const newEdges = ArrayWithObjectToMap(addEdge(params, MapToArray(self.edges)));
		self.edges.replace(newEdges);
	},
}));

export const ConstructorTemporaryStorageModel = t
	.model({
		board: t.array(BoardDataOnlyModel),
		chat: t.array(t.string),
		step: t.optional(t.number, 0),
	})
	.views((self) => ({
		get getBoard() {
			return self.board;
		},
	}))
	.actions((self) => {
		type TTemporaryStorage = Omit<SnapshotOut<typeof self>, 'step'>;
		return {
			addNode<T extends keyof TTemporaryStorage>(
				storeType: T,
				node: ArrayElementType<TTemporaryStorage[T]>,
			) {
				(
					self[storeType] as unknown as IArrayType<
						ArrayElementType<TTemporaryStorage[T]>
					>
				).push(node);
				self.step++;
			},
			removeNode<T extends keyof TTemporaryStorage>(storeType: T) {
				self[storeType].pop();
				self.step--;
			},
		};
	});

interface IArrayType<T> extends Array<T> {
	push(item: T): number;
}
type ArrayElementType<T> = T extends (infer U)[] ? U : never;

const json = [
	{ id: 1, name: '', message: '', parentId: null, childrenIds: [2, 3] },
	{ id: 2, name: '', message: '', parentId: 1, childrenIds: [] },
	{ id: 3, name: '', message: '', parentId: 1, childrenIds: [] },
];
