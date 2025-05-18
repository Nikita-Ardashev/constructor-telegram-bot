import { SnapshotOut, t } from 'mobx-state-tree';
import { ConstructorMessagesModel } from './constructor';

export const ConstructorModel = t
	.model({
		step: t.optional(t.number, 0),
		messages: t.array(ConstructorMessagesModel),
	})
	.views((self) => {
		type TSelf = SnapshotOut<typeof self>;
		return {
			get<T extends keyof TSelf>(key: T) {
				return self[key];
			},
		};
	})
	.actions((self) => {
		type TSelf = Omit<SnapshotOut<typeof self>, 'step'>;
		return {
			addNode<T extends keyof TSelf>(storeType: T, node: ArrayElementType<TSelf[T]>) {
				(self[storeType] as unknown as IArrayType<ArrayElementType<TSelf[T]>>).push(
					node,
				);
				self.step++;
			},
			removeNode<T extends keyof TSelf>(storeType: T) {
				self[storeType].pop();
				self.step--;
			},
		};
	});

interface IArrayType<T> extends Array<T> {
	push(item: T): number;
}
type ArrayElementType<T> = T extends (infer U)[] ? U : never;
