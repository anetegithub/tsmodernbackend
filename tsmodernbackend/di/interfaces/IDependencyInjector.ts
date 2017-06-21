import { Iioc } from '../../ioc/interfaces/Iioc';

export interface IDependencyInjector {
	container: Iioc;
	injectProperty(object: any, property: string): any;
	injectConstructor(type: { new (...args): {} }): any;
}