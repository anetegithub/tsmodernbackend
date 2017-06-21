interface Object {
	instanceOf(object: { new (...args): {} }): boolean;
	__props(core?: boolean): string[];
}