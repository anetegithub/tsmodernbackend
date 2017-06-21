import { Lifestyle } from './Lifestyle';

export class RegisteredComponent {
	name?: string;
	lifestyle?: Lifestyle;
	type: { new (...args): {} };
	realizer: { new (...args): {} };
}