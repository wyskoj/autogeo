import { IconType } from 'react-icons';
import { OperationCategory } from './operation-category';
import { MdPublic, MdStackedLineChart } from 'react-icons/md';
import { z } from 'zod';
import DifferentialLevelingDisplay from '../components/display/least-squares/differential-leveling';
import RadiiDisplay from '../components/display/geodetic/radii';
import GeocentricForward from '../comps/operations/coordinate-computations/geocentric-forward';
import { Radii } from '../comps/operations/geodetic/radii';
import AdjustDifferentialLeveling from '../comps/operations/least-squares/differential-leveling';
import {
	GeocentricForwardDataSchema,
	GeocentricForwardResultSchema,
} from './operation/coordinate-computations/geocentric-cartesian-coordinate';
import { OperationData, OperationResults } from './operation-instance';
import { RadiiDataSchema, RadiiResultSchema } from './operation/geodetic/radii';
import {
	DifferentialLevelingDataSchema,
	DifferentialLevelingResultsSchema,
} from './operation/least-squares/differential-leveling';
import ParseDifferentialLeveling from '../cg-parse/least-squares/differential-leveling';
import GeocentricForwardsDisplay from '../components/display/coordinate-computations/geocentric-forwards';
import { CGDocs } from './ghilani';
import DifferentialLevelingDocs from '../cg-docs/least-squares/differential-leveling';

// A list of all operations.
export const OperationSchema = z.union([
	z.literal('differential-leveling'),
	z.literal('horizontal-adjustment'),
	z.literal('3d-geodetic'),
	z.literal('solar-shot-reduction'),
	z.literal('star-shot-reduction'),
	z.literal('azimuth-reduction'),
	z.literal('predict-position'),
	z.literal('radii'),
	z.literal('geocentric-forwards'),
]);
export type Operation = z.infer<typeof OperationSchema>;

// Defines information about an operation.
export interface OperationInfo {
	id: Operation;
	name: string;
	icon: IconType;
	display: (props: { data: any; results: any }) => JSX.Element;
	operate: (data: any) => any;
	data: z.ZodSchema<OperationData>;
	results: z.ZodSchema<OperationResults>;
	parse?: (string: string) => { name: string; data: any };
}

export const operations: { [key in OperationCategory]: OperationInfo[] } = {
	'coordinate-computations': [
		{
			id: 'geocentric-forwards',
			name: 'Geocentric Forwards',
			icon: MdPublic,
			display: GeocentricForwardsDisplay,
			operate: GeocentricForward,
			data: GeocentricForwardDataSchema,
			results: GeocentricForwardResultSchema,
		},
	],
	'geodetic': [
		{
			id: 'radii',
			name: 'Radii',
			icon: MdPublic,
			display: RadiiDisplay,
			operate: Radii,
			data: RadiiDataSchema,
			results: RadiiResultSchema,
		},
	],
	'least-squares': [
		{
			id: 'differential-leveling',
			name: 'Differential Leveling',
			icon: MdStackedLineChart,
			display: DifferentialLevelingDisplay,
			operate: AdjustDifferentialLeveling,
			data: DifferentialLevelingDataSchema,
			results: DifferentialLevelingResultsSchema,
			parse: ParseDifferentialLeveling,
		},
	],
};

// Defines whether an operation supports importing ADJUST files.
export const OperationSupportsAdjustFile: { [key in Operation]: boolean } = {
	'geocentric-forwards': true,
	'differential-leveling': true,
	'radii': false,
	'3d-geodetic': false,
	'azimuth-reduction': false,
	'horizontal-adjustment': false,
	'predict-position': false,
	'solar-shot-reduction': false,
	'star-shot-reduction': false,
};

// Maps operations to their CGDocs definition.
export const OperationDocs: { [key in Operation]?: CGDocs } = {
	'differential-leveling': DifferentialLevelingDocs,
};
