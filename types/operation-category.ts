import { MdAutoAwesome, MdAutoFixHigh } from 'react-icons/md';
import OperationCategoryCard from '../components/operation-category-card';
import { IconType } from 'react-icons';

/**
 * Defines a category of operations.
 */
export type OperationCategory = 'least-squares' | 'astronomical-observations';

export interface OperationCategoryInfo {
	category: OperationCategory;
	name: string;
	icon: IconType;
}

export const operationCategories: OperationCategoryInfo[] = [
	{
		category: 'least-squares',
		name: 'Least-squares adjustments',
		icon: MdAutoFixHigh,
	},
	{
		category: 'astronomical-observations',
		name: 'Astronomical observations',
		icon: MdAutoAwesome,
	},
];
