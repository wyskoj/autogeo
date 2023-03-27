import { useState } from 'react';
import DMS from '../types/dms';

type DMSProps = readonly [
	/** The DMS object. */
	dms: DMS,
	/** Functions to set the DMS object's values. */
	setDMS: {
		setD: (d: number | null) => void;
		setM: (m: number | null) => void;
		setS: (s: number | null) => void;
	},
	/** A function to set the DMS object's values from a decimal degree. */
	setDD: (degrees: number) => void
];

/**
 * A hook that returns a DMS object and functions to set its values.
 */
export default function useDMS(): DMSProps {
	const [d, setD] = useState<number | null>(null);
	const [m, setM] = useState<number | null>(null);
	const [s, setS] = useState<number | null>(null);

	function setDD(degrees: number) {
		const d = Math.floor(degrees);
		const m = Math.floor((degrees - d) * 60);
		const s = (degrees - d - m / 60) * 3600;
		setD(d);
		setM(m);
		setS(s);
	}

	return [{ d, m, s }, { setD, setM, setS }, setDD];
}
