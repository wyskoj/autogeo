import { useAuthenticatedDocumentData, useDefaultAuthState } from './firebase';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from '@firebase/firestore';
import { z } from 'zod';

type User = {
	displayName: string;
	email: string;
	photoURL: string;
	settings: UserSettings;
};

const UserSettingsSchema = z.object({
	distanceDecimalPlaces: z.number().int().min(0).max(10),
	angleDecimalPlaces: z.number().int().min(0).max(10),
});
export type UserSettings = z.infer<typeof UserSettingsSchema>;

type UserSettingsFunctions = {
	settings: UserSettings | undefined;
	updateSettings: (settings: UserSettings) => Promise<void>;
};

export function useSettings(): UserSettingsFunctions {
	const { user } = useDefaultAuthState();

	const retrieval =
		useAuthenticatedDocumentData<User>(user =>
			doc(getFirestore(), 'users', user.uid)
		)[0] ?? null;
	const settings = (retrieval as User | null)?.settings;

	async function updateSettings(settings: UserSettings) {
		if (!user) {
			return;
		}
		await setDoc(doc(getFirestore(), 'users', user.uid), {
			...retrieval,
			settings,
		});
	}

	return {
		settings,
		updateSettings,
	};
}
