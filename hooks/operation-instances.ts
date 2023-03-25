import {
	useAuthenticatedCollectionData,
	useDefaultAuthState,
} from './firebase';
import { collection, deleteDoc, getFirestore } from 'firebase/firestore';
import { OperationInstance } from '../types/operation-instance';
import { doc, setDoc } from '@firebase/firestore';

export function useOperationInstances() {
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
