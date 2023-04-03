import { z } from 'zod';
import DifferentialLevelingComp from './least-squares/differential-leveling/differential-leveling-comp';
import { RadiiComp } from './geodetic-computations/radii/radii-comp';
import GeocentricForwardsComp from './coordinate-computations/geocentric-forwards/geocentric-forwards-comp';
import DifferentialLevelingDisplay from './least-squares/differential-leveling/differential-leveling-display';
import RadiiDisplay from './geodetic-computations/radii/radii-display';
import GeocentricForwardsDisplay from './coordinate-computations/geocentric-forwards/geocentric-forwards-display';
import { DifferentialLevelingDocs } from './least-squares/differential-leveling/differential-leveling-docs';
import { CGDocs } from '../types/ghilani';
import DifferentialLevelingExport from './least-squares/differential-leveling/differential-leveling-export';
import RadiiExport from './geodetic-computations/radii/radii-export';
import GeocentricForwardsExport from './coordinate-computations/geocentric-forwards/geocentric-forwards-export';
import DifferentialLevelingParse from './least-squares/differential-leveling/differential-leveling-parse';
import { ParseResult } from '../types/parse';
import { OperationData } from './operation-instance';
import { IconType } from 'react-icons';
import {
	MdAutoFixHigh,
	MdCamera,
	MdGridOn,
	MdPublic,
	MdStackedLineChart,
	MdTransform,
} from 'react-icons/md';
import { GroundSamplingDistanceComp } from './remote-sensing/ground-sampling-distance/ground-sampling-distance-comp';
import { GroundSamplingDistanceDisplay } from './remote-sensing/ground-sampling-distance/ground-sampling-distance-display';
import GroundSamplingDistanceExport from './remote-sensing/ground-sampling-distance/ground-sampling-distance-export';
import { RxAngle } from 'react-icons/rx';
import { DistanceDistanceIntersectionComp } from './coordinate-geometry/distance-distance-intersection/distance-distance-intersection-comp';
import { DistanceDistanceIntersectionDisplay } from './coordinate-geometry/distance-distance-intersection/distance-distance-intersection-display';
import { TbChartCircles } from 'react-icons/tb';
import { DistanceDistanceIntersectionExport } from './coordinate-geometry/distance-distance-intersection/distance-distance-intersection-export';
import { COGO } from '../utils/custom-logos';

export const OperationSchema = z.enum([
	'differential-leveling',
	'distance-distance-intersection',
	'geocentric-forwards',
	'ground-sampling-distance',
	'radii',
]);
export type Operation = z.infer<typeof OperationSchema>;

export const OperationCategorySchema = z.enum([
	'coordinate-computations',
	'coordinate-geometry',
	'geodetic-computations',
	'least-squares',
	'remote-sensing',
]);
export type OperationCategory = z.infer<typeof OperationCategorySchema>;

// Operations that can be parsed from a string.
export const OperationParsableSchema = z.literal('differential-leveling'); // todo add more
export type OperationParsable = z.infer<typeof OperationParsableSchema>;

///////////////////////////////   MAPS   ///////////////////////////////

export type OperationCategoryInfo = {
	name: string;
	icon: IconType;
	operations: Operation[];
};
export const OperationCategories: {
	[key in OperationCategory]: OperationCategoryInfo;
} = {
	'coordinate-computations': {
		icon: MdTransform,
		name: 'Coordinate Computations',
		operations: ['geocentric-forwards'],
	},
	'coordinate-geometry': {
		icon: COGO,
		name: 'Coordinate Geometry',
		operations: ['distance-distance-intersection'],
	},
	'geodetic-computations': {
		icon: MdPublic,
		name: 'Geodetic Computations',
		operations: ['radii'],
	},
	'least-squares': {
		name: 'Least-squares Adjustments',
		icon: MdAutoFixHigh,
		operations: ['differential-leveling'],
	},
	'remote-sensing': {
		icon: MdCamera,
		name: 'Remote Sensing',
		operations: ['ground-sampling-distance'],
	},
};

// Runs the comps for each operation.
export const OperationComp: { [key in Operation]: (data: any) => any } = {
	'differential-leveling': DifferentialLevelingComp,
	'radii': RadiiComp,
	'geocentric-forwards': GeocentricForwardsComp,
	'ground-sampling-distance': GroundSamplingDistanceComp,
	'distance-distance-intersection': DistanceDistanceIntersectionComp,
};

export const OperationDisplay: {
	[key in Operation]: (props: { data: any; result: any }) => JSX.Element;
} = {
	'differential-leveling': DifferentialLevelingDisplay,
	'radii': RadiiDisplay,
	'geocentric-forwards': GeocentricForwardsDisplay,
	'ground-sampling-distance': GroundSamplingDistanceDisplay,
	'distance-distance-intersection': DistanceDistanceIntersectionDisplay,
};

export const OperationDocs: { [key in OperationParsable]: CGDocs } = {
	'differential-leveling': DifferentialLevelingDocs,
	// 'geocentric-forwards': GeocentricForwardsDocs
};

export const OperationExport: {
	[key in Operation]?: (instance: any, format: any) => string;
} = {
	'differential-leveling': DifferentialLevelingExport,
	'radii': RadiiExport,
	'geocentric-forwards': GeocentricForwardsExport,
	'ground-sampling-distance': GroundSamplingDistanceExport,
	'distance-distance-intersection': DistanceDistanceIntersectionExport,
};

export const OperationIcon: { [key in Operation]: IconType } = {
	'differential-leveling': MdStackedLineChart,
	'radii': MdPublic,
	'geocentric-forwards': MdPublic,
	'ground-sampling-distance': MdGridOn,
	'distance-distance-intersection': TbChartCircles,
};

// Display name of each operation.
export const OperationName: { [key in Operation]: string } = {
	'differential-leveling': 'Differential Leveling',
	'radii': 'Radii',
	'geocentric-forwards': 'Geocentric Forwards',
	'ground-sampling-distance': 'Ground Sampling Distance',
	'distance-distance-intersection': 'Distance-Distance Intersection',
};

export const OperationParse: {
	[key in OperationParsable]: (data: string) => ParseResult<OperationData>;
} = {
	'differential-leveling': DifferentialLevelingParse,
};

/// FUNCTIONS ///

/**
 * Finds the category that contains a given operation.
 *
 * @param operation The operation to find the category of.
 * @returns The category that contains the operation.
 */
export function getOperationCategory(operation: Operation): {
	category: OperationCategory;
	info: OperationCategoryInfo;
} {
	for (const category of Object.keys(
		OperationCategories
	) as OperationCategory[]) {
		if (OperationCategories[category].operations.includes(operation)) {
			return { category, info: OperationCategories[category] };
		}
	}
	throw Error('Operation category not found!');
}
