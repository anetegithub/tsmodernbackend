import { Lifestyle } from './Lifestyle';
import { InjectionType } from '../../di/struct/InjectionType';

export class RegisteredComponent {
	name?: string;
	lifestyle?: Lifestyle;
	injection?: InjectionType;
	type: { new (...args): {} };
	realizer: { new (...args): {} };
}