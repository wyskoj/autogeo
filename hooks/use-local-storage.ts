import { useEffect, useState } from 'react';
import { ZodSchema } from 'zod';

/**
 * Attempts to load data from localstorage.
 *
 * If the hook is currently trying to
 * load the data, `data` is undefined.
 * If the value associated with the key is
 * not specified, `data` is null.
 *
 * @param key the localstorage key
 * @param schema the schema of the expected data
 * @return the data, and a function to set the data
 */
export default function useLocalStorage<T>(key: string, schema: ZodSchema<T>) {
	const [data, setData] = useState<T | null | undefined>(undefined);

	useEffect(() => {
		if (data !== undefined) {
			return;
		}
		const item = localStorage.getItem(key);
		if (item) {
			const parse = JSON.parse(item);
			const validate = schema.safeParse(parse);
			if (validate.success) {
				setData(validate.data);
			} else {
				console.warn('Invalid data.');
			}
		} else {
			setData(null);
		}
	}, [key, data, schema]);

	function setLocalStorage(data: T) {
		localStorage.setItem(key, JSON.stringify(data));
		setData(data);
	}

	return [data, setLocalStorage] as const;
}
