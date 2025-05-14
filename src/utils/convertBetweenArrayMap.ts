import { IMapType, IMSTMap, IStateTreeNode, IType } from 'mobx-state-tree';

export const ArrayWithObjectToMap = <T extends { id: string | number }>(array: T[]) => {
	return new Map(array.map((a) => [a.id, a]));
};

export const MapToArray = <T>(
	map:
		| Map<string | number, T>
		| (IMSTMap<IType<T, T, T>> & IStateTreeNode<IMapType<IType<T, T, T>>>),
) => {
	return Array.from(map.values());
};
