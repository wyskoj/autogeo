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
	latLonDecimalPlaces: z.number().int().min(0).max(10),
	coordinateDecimalPlaces: z.number().int().min(0).max(10),
	scaleFactorDecimalPlaces: z.number().int().min(0).max(10),
	criticalValueDecimalPlaces: z.number().int().min(0).max(10),
});
export type UserSettings = z.infer<typeof UserSettingsSchema>;

type UserSettingsFunctions = {
	settings: UserSettings | undefined;
	updateSettings: (settings: UserSettings) => Promise<void>;
};
export const DefaultSettings: UserSettings ={
	angleDecimalPlaces: 2,
	distanceDecimalPlaces: 3,
	latLonDecimalPlaces: 5,
	coordinateDecimalPlaces:3,
	scaleFactorDecimalPlaces: 10,
	criticalValueDecimalPlaces: 3,
};

export function useSettings(): UserSettingsFunctions {
	const { user } = useDefaultAuthState();

	const retrieval = useAuthenticatedDocumentData<User>(user =>
		doc(getFirestore(), 'users', user.uid)
	);
	let settings: UserSettings | undefined;
	if (!retrieval[1]) {
		settings =
			retrieval[0]?.settings ?? DefaultSettings;
	}

	async function updateSettings(settings: UserSettings) {
		if (!user) {
			return;
		}
		await setDoc(doc(getFirestore(), 'users', user.uid), {
			...retrieval[0],
			settings,
		});
	}

	return {
		settings,
		updateSettings,
	};
}
