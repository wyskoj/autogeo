import { getAuth, User } from 'firebase/auth';
import {
	CollectionReference,
	DocumentReference,
	DocumentSnapshot,
	QuerySnapshot,
} from 'firebase/firestore';
import router from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
	useCollectionData,
	useDocumentData,
} from 'react-firebase-hooks/firestore';

/**
 * Redirects the user to the login page if they are not logged in.
 * @returns The hook.
 */
export function useAuthenticatedRoute() {
	const { user, loading } = useDefaultAuthState();

	return useEffect(() => {
		if (!user && !loading) {
			router.push('/login?next=prev');
		}
	}, [user, loading]);
}

/**
 * Gets the useAuthState hook using the default Firebase auth.
 * @returns The hook.
 */
export function useDefaultAuthState() {
	const [user, loading, error] = useAuthState(getAuth());

	return { user: user ?? null, loading, error };
}

/**
 * Gets the {@link useCollectionData} hook using the default Firebase auth.
 * @param callback A callback that takes a user and returns a collection
 * reference.
 * @returns The hook.
 */
export function useAuthenticatedCollectionData<T>(
	callback: (user: User) => CollectionReference
) {
	const { user } = useDefaultAuthState();

	return useCollectionData(user && callback(user)) as [
		T[] | undefined,
		boolean,
		Error | undefined,
		QuerySnapshot<T>
	];
}

/**
 * Gets the {@link useDocumentData} hook using the default Firebase auth.
 * @param callback A callback that takes a user and returns a document reference
 * @returns The hook.
 */
export function useAuthenticatedDocumentData<T>(
	callback: (user: User) => DocumentReference
) {
	const { user } = useDefaultAuthState();

	return useDocumentData(user && callback(user)) as [
		T | undefined,
		boolean,
		Error | undefined,
		DocumentSnapshot<T> | undefined
	];
}
