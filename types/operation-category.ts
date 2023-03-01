import { MdAutoFixHigh, MdPublic, MdTransform } from 'react-icons/md';
import { IconType } from 'react-icons';

/**
 * Defines a category of operations.
 */
export type OperationCategory =
	| 'least-squares'
	| 'geodetic'
	| 'coordinate-computations';

export interface OperationCategoryInfo {
	name: string;
	icon: IconType;
}

export const operationCategories: {
	[key in OperationCategory]: OperationCategoryInfo;
} = {
	'least-squares': {
		name: 'Least-squares adjustments',
		icon: MdAutoFixHigh,
	},
	'geodetic': {
		name: 'Geodetic Computations',
		icon: MdPublic,
	},
	'coordinate-computations': {
		name: 'Coordinate Computations',
		icon: MdTransform,
	},
};
