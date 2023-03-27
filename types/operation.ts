import { IconType } from 'react-icons';
import { OperationCategory } from './operation-category';
import { MdPublic, MdStackedLineChart } from 'react-icons/md';
import { z } from 'zod';
import DifferentialLevelingDisplay from '../components/display/least-squares/differential-leveling';
import RadiiDisplay from '../components/display/geodetic/radii';
import GeocentricForwardsComp from '../comps/operations/coordinate-computations/geocentric-forwards';
import { RadiiComp } from '../comps/operations/geodetic/radii';
import DifferentialLevelingComp from '../comps/operations/least-squares/differential-leveling';
import {
	GeocentricForwardsDataSchema,
	GeocentricForwardsResultSchema,
} from './operation/coordinate-computations/geocentric-forwards';
import {
	OperationData,
	OperationInstance,
	OperationResult,
} from './operation-instance';
import { RadiiDataSchema, RadiiResultSchema } from './operation/geodetic/radii';
import {
	DifferentialLevelingDataSchema,
	DifferentialLevelingResultSchema,
} from './operation/least-squares/differential-leveling';
import DifferentialLevelingParse from '../cg-parse/least-squares/differential-leveling';
import GeocentricForwardsDisplay from '../components/display/coordinate-computations/geocentric-forwards';
import { CGDocs } from './ghilani';
import { DifferentialLevelingDocs } from '../cg-docs/least-squares/differential-leveling';
import DifferentialLevelingExport from '../export/least-squares/differential-leveling';
import { ExportFormat } from './export-format';
import RadiiExport from '../export/geodetic-computations/radii';
import GeocentricForwardsExport from '../export/coordinate-computations/geocentric-forwards';
import { ParseResult } from './parse';

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
	display: (props: { data: any; result: any }) => JSX.Element;
	operate: (data: any) => any;
	data: z.ZodSchema<OperationData>;
	result: z.ZodSchema<OperationResult>;
	parse?: (string: string) => ParseResult<OperationData>;
	export?: (instance: OperationInstance, format: ExportFormat) => string;
}

export const operations: { [key in OperationCategory]: OperationInfo[] } = {
	'coordinate-computations': [
		{
			id: 'geocentric-forwards',
			name: 'Geocentric Forwards',
			icon: MdPublic,
			display: GeocentricForwardsDisplay,
			operate: GeocentricForwardsComp,
			data: GeocentricForwardsDataSchema,
			result: GeocentricForwardsResultSchema,
			export: GeocentricForwardsExport,
		},
	],
	'geodetic': [
		{
			id: 'radii',
			name: 'Radii',
			icon: MdPublic,
			display: RadiiDisplay,
			operate: RadiiComp,
			data: RadiiDataSchema,
			result: RadiiResultSchema,
			export: RadiiExport,
		},
	],
	'least-squares': [
		{
			id: 'differential-leveling',
			name: 'Differential Leveling',
			icon: MdStackedLineChart,
			display: DifferentialLevelingDisplay,
			operate: DifferentialLevelingComp,
			data: DifferentialLevelingDataSchema,
			result: DifferentialLevelingResultSchema,
			parse: DifferentialLevelingParse,
			export: DifferentialLevelingExport,
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
