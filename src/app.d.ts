// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { getNDK } from './ndk.service';

// Export a global variable that contains the NDK instance
export const ndk = getNDK();

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
