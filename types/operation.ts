import { IconType } from 'react-icons';
import { OperationCategory } from './operation-category';
import {
	Md3DRotation,
	MdAutoAwesome,
	MdStackedLineChart,
	MdStar,
	MdWbSunny,
} from 'react-icons/md';
import { RiRouteFill } from 'react-icons/ri';

export type Operation =
	| 'differential-leveling'
	| 'horizontal-adjustment'
	| '3d-geodetic'
	| 'solar-shot-reduction'
	| 'star-shot-reduction'
	| 'azimuth-reduction'
	| 'predict-position';

export interface OperationInfo {
	id: Operation;
	name: string;
	icon: IconType;
}

export const operations: { [key in OperationCategory]: OperationInfo[] } = {
	'astronomical-observations': [
		{
			id: 'solar-shot-reduction',
			name: 'Solar Shot Reduction',
			icon: MdWbSunny,
		},
		{
			id: 'star-shot-reduction',
			name: 'Star Shot Reduction',
			icon: MdStar,
		},
		{
			id: 'azimuth-reduction',
			name: 'Azimuth reduction',
			icon: MdAutoAwesome,
		},
		{
			id: 'predict-position',
			name: 'Predict position',
			icon: MdAutoAwesome,
		},
	],
	'least-squares': [
		{
			id: 'differential-leveling',
			name: 'Differential Leveling',
			icon: MdStackedLineChart,
		},
		{
			id: 'horizontal-adjustment',
			name: 'Horizontal Adjustment',
			icon: RiRouteFill,
		},
		{
			id: '3d-geodetic',
			name: '3D Geodetic Adjustment',
			icon: Md3DRotation,
		},
	],
};
