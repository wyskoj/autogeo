export const FIREBASE_OPTIONS = {
	apiKey: 'AIzaSyDuuLxXp-t07zabTsEqfyGeQPhWKbqbjnM',
	authDomain: 'autogeo-5c4b6.firebaseapp.com',
	projectId: 'autogeo-5c4b6',
	storageBucket: 'autogeo-5c4b6.appspot.com',
	messagingSenderId: '143880131094',
	appId: '1:143880131094:web:e55058204a6baefb4b1b37',
};

/**
 * Checks whether the current environment is a browser.
 * @returns Whether the current environment is a browser.
 */
export function isBrowser() {
	return typeof window === 'object';
}

/**
 * Checks whether the current environment is a server.
 * @returns Whether the current environment is a server.
 */
export function isServer() {
	return typeof window === 'undefined';
}

/**
 * Checks whether the current environment is in development mode.
 * @returns Whether the current environment is in development mode.
 */
export function isDev() {
	return process.env.NODE_ENV === 'development';
}

/**
 * Checks whether the current environment is in production mode.
 * @returns Whether the current environment is in production mode.
 */
export function isProd() {
	return process.env.NODE_ENV === 'production';
}
