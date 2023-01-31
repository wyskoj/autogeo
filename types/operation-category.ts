import { MdAutoAwesome, MdAutoFixHigh } from 'react-icons/md';
import OperationCategoryCard from '../components/operation-category-card';
import { IconType } from 'react-icons';
import { Operation } from './operation';

/**
 * Defines a category of operations.
 */
export type OperationCategory = 'least-squares' | 'astronomical-observations';

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
	'astronomical-observations': {
		name: 'Astronomical observations',
		icon: MdAutoAwesome,
	},
};