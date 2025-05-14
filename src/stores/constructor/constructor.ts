import { t } from 'mobx-state-tree';

export const ConstructorActionModel = t.model({
	id: t.identifier,
	label: t.string,
	parentId: t.string,
	childrenIds: t.array(t.string),
});

export const ConstructorModel = t.model({});
