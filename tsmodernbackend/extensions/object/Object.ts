export module extensions {
	Object.prototype.__props = function (core: boolean = false): string[] {
		var notCoreFunc = function (key: string) {
			return ["constructor",
				"clone",
				"__defineGetter__",
				"__defineSetter__",
				"hasOwnProperty",
				"__lookupGetter__",
				"__lookupSetter__",
				"propertyIsEnumerable",
				"__proto__",
				"toString",
				"toLocaleString",
				"valueOf",
				"isPrototypeOf",
				"instanceOf",
				"__props"].indexOf(key) == -1;
		}
		var p = [];
		let obj = this;
		for (; obj != null; obj = Object.getPrototypeOf(obj)) {
			var op = Object.getOwnPropertyNames(obj);
			for (var i = 0; i < op.length; i++)
				if (p.indexOf(op[i]) == -1)
					p.push(op[i]);
		}
		return p.filter(core ? notCoreFunc : x => true);
	}

	Object.prototype.instanceOf = function (ctor: { new (...args): {} }): boolean {
		var object = new ctor();
		var thisProps = this.__props();
		var missing = object.__props().filter(z => thisProps.indexOf(z) < 0);
		return missing.length == 0;
	};
}