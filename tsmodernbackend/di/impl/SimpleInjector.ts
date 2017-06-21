import { IDependencyInjector } from '../interfaces/IDependencyInjector';
import { Iioc } from '../../ioc/interfaces/Iioc';

export class SimpleInjector implements IDependencyInjector {
	container: Iioc;

	injectProperty(object: any, property: string): any {
		object[property] = this.container;
		return object;
	}
	injectConstructor(type: new (...args: any[]) => {}): any {
		return new type(this.container);
	}
}