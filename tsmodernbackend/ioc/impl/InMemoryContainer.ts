import { Lifestyle } from '../struct/Lifestyle';
import { RegisteredComponent } from '../struct/RegisteredComponent';
import { Iioc } from '../interfaces/Iioc';
import { SimpleInjector } from '../../di/impl/SimpleInjector';
import { InjectionType } from '../../di/struct/InjectionType';
require('../../extensions/object/Object');

export class InMemoryContainer implements Iioc {
	constructor() {
		this.injector = new SimpleInjector();
		this.injector.container = this;
	}

	private components: RegisteredComponent[] = new Array<RegisteredComponent>();
	private injector: SimpleInjector;

	resolve<T>(type: new (...args: any[]) => T): T;
	resolve<T>(type: new (...args: any[]) => T, name: string): T;
	resolve<T>(type: new (...args: any[]) => T, name?: any): T {
		var suitable = this.components.filter(x => {
			if (name && x.name != name) return false;
			var t = new x.type();
			return t.instanceOf(type);
		});

		if (suitable.length == 0)
			throw new Error(`Component for type ${type.name} does not registered!`);

		var component = suitable[0];

		switch (component.injection) {
			case InjectionType.Constructor:
				return this.injector.injectConstructor(component.realizer) as any;
			case InjectionType.Property:
				return this.injector.injectProperty(new component.realizer(), '__container') as any;
		}
	}

	register(component: RegisteredComponent) {
		if (!component.injection) {
			component.injection = InjectionType.Constructor;
		}
		this.components.push(component);
	}
}