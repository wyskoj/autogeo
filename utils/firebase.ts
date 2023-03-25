import { FIREBASE_OPTIONS, isBrowser, isDev, isProd } from './environment';
import { getApps, initializeApp } from 'firebase/app';
import {
	connectFirestoreEmulator,
	enableMultiTabIndexedDbPersistence,
	getFirestore,
} from 'firebase/firestore';
import { connectAuthEmulator } from '@firebase/auth';
import { getAuth } from 'firebase/auth';

/**
 * Initializes the Firebase app.
 */
export function initializeFirebase() {
	if (getApps().length === 0) {
		initializeApp(FIREBASE_OPTIONS);

		if (isDev()) {
			connectAuthEmulator(getAuth(), 'http://localhost:9099', {
				disableWarnings: true,
			});
			connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
		}

		if (isBrowser() && isProd()) {
			try {
				enableMultiTabIndexedDbPersistence(getFirestore());
			} catch (error) {
				console.error('Failed to enable offline database persistence', error);
			}
		}
	}
}
