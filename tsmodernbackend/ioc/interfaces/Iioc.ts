import { Lifestyle } from '../struct/Lifestyle';
import { RegisteredComponent } from '../struct/RegisteredComponent';
import { Type } from '../../utility/Type';

export interface Iioc {	
	register(component: RegisteredComponent);
	resolve<T>(type: Type<T>): T;
	resolve<T>(type: Type<T>, name: string): T;
}