import {
	useAuthenticatedCollectionData,
	useDefaultAuthState,
} from './firebase';
import { collection, deleteDoc, getFirestore } from 'firebase/firestore';
import { OperationInstance } from '../types/operation-instance';
import { doc, setDoc } from '@firebase/firestore';

type OperationInstancesFunctions = {
	/**
	 * Creates a new operation instance.
	 * @param instance The operation instance to create.
	 */
	createInstance: (instance: OperationInstance) => void;
	/**
	 * The operation instances of the current user.
	 */
	operationInstances: OperationInstance[] | null;
	/**
	 * Updates an operation instance.
	 * @param id The id of the operation instance to update.
	 * @param instance The new operation instance.
	 */
	updateInstance: (id: string, instance: OperationInstance | null) => void;
};

/**
 * Hook to get the operation instances of the current user.
 *
 * @returns The operation instances of the current user.
 */
export function useOperationInstances(): OperationInstancesFunctions {
	const { user } = useDefaultAuthState();
	const operationInstances =
		useAuthenticatedCollectionData<OperationInstance>(user =>
			collection(getFirestore(), 'users', user.uid, 'operation-instances')
		)[0] ?? null;

	function createInstance(instance: OperationInstance) {
		if (user) {
			setDoc(
				doc(
					getFirestore(),
					`/users/${user.uid}/operation-instances/${instance.id}`
				),
				instance
			);
		}
	}

	function updateInstance(id: string, instance: OperationInstance | null) {
		if (user) {
			if (instance) {
				setDoc(
					doc(getFirestore(), `/users/${user.uid}/operation-instances/${id}`),
					instance
				);
			} else {
				deleteDoc(
					doc(getFirestore(), `/users/${user.uid}/operation-instances/${id}`)
				);
			}
		}
	}

	return { operationInstances, createInstance, updateInstance };
}
