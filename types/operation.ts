import { IconType } from 'react-icons';
import { OperationCategory } from './operation-category';
import { MdPublic, MdStackedLineChart } from 'react-icons/md';
import { z } from 'zod';
import {
	OperationData,
	OperationInstance,
	OperationResult,
} from './operation-instance';
import { CGDocs } from './ghilani';
import { ExportFormat } from './export-format';
import { ParseResult } from './parse';
import DifferentialLevelingComp from '../operation/least-squares/differential-leveling/differential-leveling-comp';
import { DifferentialLevelingDataSchema } from '../operation/least-squares/differential-leveling/differential-leveling-data';
import { DifferentialLevelingResultSchema } from '../operation/least-squares/differential-leveling/differential-leveling-result';
import DifferentialLevelingDisplay from '../operation/least-squares/differential-leveling/differential-leveling-display';
import { DifferentialLevelingDocs } from '../operation/least-squares/differential-leveling/differential-leveling-docs';
import DifferentialLevelingExport from '../operation/least-squares/differential-leveling/differential-leveling-export';
import DifferentialLevelingParse from '../operation/least-squares/differential-leveling/differential-leveling-parse';
import { RadiiComp } from '../operation/geodetic-computations/radii/radii-comp';
import { RadiiDataSchema } from '../operation/geodetic-computations/radii/radii-data';
import { RadiiResultSchema } from '../operation/geodetic-computations/radii/radii-result';
import RadiiDisplay from '../operation/geodetic-computations/radii/radii-display';
import RadiiExport from '../operation/geodetic-computations/radii/radii-export';
import GeocentricForwardsComp from '../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-comp';
import GeocentricForwardsDisplay
	from '../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-display';
import GeocentricForwardsExport
	from '../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-export';
import {
	GeocentricForwardsDataSchema
} from '../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-data';
import {
	GeocentricForwardsResultSchema
} from '../operation/coordinate-computations/geocentric-forwards/geocentric-forwards-result';

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
