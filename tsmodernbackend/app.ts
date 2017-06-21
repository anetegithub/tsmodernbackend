import { InMemoryContainer } from './ioc/impl/InMemoryContainer';

export module app {
	export function hello(): string {
		var container = new InMemoryContainer();
		container.register({
			type: Messenger,
			realizer: SimpleMessegner
		});
		var messenger = container.resolve(Messenger);
		return messenger.message();
	}

	class Messenger {
		message(): string { return ''; }
	}

	class SimpleMessegner implements Messenger {
		constructor(container: InMemoryContainer) {
			console.log(container != null);
		}

		message(): string {
			return 'Method message is not implemented.';
		}
		simple(): string {
			return 'simple method';
		}
	}
}