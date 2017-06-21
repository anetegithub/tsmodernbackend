import { Lifestyle } from '../struct/Lifestyle';
import { RegisteredComponent } from '../struct/RegisteredComponent';
import { Iioc } from '../interfaces/Iioc';
require('../../extensions/object/Object');

export class InMemoryContainer implements Iioc {
	private components: RegisteredComponent[] = new Array<RegisteredComponent>();

	resolve<T>(type: new (...args: any[]) => T): T;
	resolve<T>(type: new (...args: any[]) => T, name: string): T;
	resolve<T>(type: new (...args: any[]) => T, name?: any): T {
		var suitable = this.components.filter(x => {
			if (name && x.name != name) return false;
			var t = new x.type();
			var z: string = "";
			return t.instanceOf(type);
		});

		if (suitable.length == 0)
			throw new Error(`Component for type ${type.name} does not registered!`);

		var component = suitable[0];
		return new component.realizer() as any;
	}	

	register(component: RegisteredComponent) {
		this.checkExistance(component);
		this.components.push(component);
	}

	private checkExistance(component: RegisteredComponent) {
		let checker = this.existanceChecker(component);

		if (this.components.filter(checker).length != 0) {
			throw new Error('Component already registered!');
		}
	}

	private existanceChecker(component: RegisteredComponent) {
		return (com: RegisteredComponent) => {
			var existed =
				com.type == component.type
				&& com.realizer == component.realizer;

			if (existed && component.name && com.name) {
				return component.name == com.name;
			}
		};
	}
}