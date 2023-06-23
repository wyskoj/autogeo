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
	MdAutoFixHigh, MdBarChart,
	MdCamera, MdDataExploration,
	MdGridOn, MdOutlineDataExploration, MdOutlineErrorOutline,
	MdPublic,
	MdRadar, MdRunningWithErrors, MdShowChart,
	MdShuffle,
	MdStackedLineChart,
	MdTransform
} from 'react-icons/md';
import { GroundSamplingDistanceComp } from './remote-sensing/ground-sampling-distance/ground-sampling-distance-comp';
import { GroundSamplingDistanceDisplay } from './remote-sensing/ground-sampling-distance/ground-sampling-distance-display';
import GroundSamplingDistanceExport from './remote-sensing/ground-sampling-distance/ground-sampling-distance-export';
import { DistanceDistanceIntersectionComp } from './coordinate-geometry/distance-distance-intersection/distance-distance-intersection-comp';
import { DistanceDistanceIntersectionDisplay } from './coordinate-geometry/distance-distance-intersection/distance-distance-intersection-display';
import { TbChartCircles } from 'react-icons/tb';
import { DistanceDistanceIntersectionExport } from './coordinate-geometry/distance-distance-intersection/distance-distance-intersection-export';
import { COGO, SPCS, XYZ } from '../utils/custom-logos';
import { DirectionDirectionIntersectionComp } from './coordinate-geometry/direction-direction-intersection/direction-direction-intersection-comp';
import { DirectionDirectionIntersectionDisplay } from './coordinate-geometry/direction-direction-intersection/direction-direction-intersection-display';
import { DirectionDirectionIntersectionExport } from './coordinate-geometry/direction-direction-intersection/direction-direction-intersection-export';
import { AngleAngleIntersectionComp } from './coordinate-geometry/angle-angle-intersection/angle-angle-intersection-comp';
import { AngleAngleIntersectionDisplay } from './coordinate-geometry/angle-angle-intersection/angle-angle-intersection-display';
import { AngleAngleIntersectionExport } from './coordinate-geometry/angle-angle-intersection/angle-angle-intersection-export';
import GeocentricInverseComp from './coordinate-computations/geocentric-inverse/geocentric-inverse-comp';
import { GeocentricInverseDisplay } from './coordinate-computations/geocentric-inverse/geocentric-inverse-display';
import { SpcsForwardsDisplay } from './coordinate-computations/spcs-forwards/spcs-forwards-display';
import { SpcsForwardsExport } from './coordinate-computations/spcs-forwards/spcs-forwards-export';
import { SpcsForwardsComp } from './coordinate-computations/spcs-forwards/spcs-forwards-comp';
import { SpcsInverseComp } from './coordinate-computations/spcs-inverse/spcs-inverse-comp';
import { UserSettings } from '../hooks/use-settings';
import { GeocentricInverseExport } from './coordinate-computations/geocentric-inverse/geocentric-inverse-export';
import SpcsInverseDisplay from './coordinate-computations/spcs-inverse/spcs-inverse-display';
import { SpcsInverseExport } from './coordinate-computations/spcs-inverse/spcs-inverse-export';
import { OneVariableStatsComp } from './statistical-analyses/one-variable-stats/one-variable-stats-comp';
import { OneVariableStatsExport } from './statistical-analyses/one-variable-stats/one-variable-stats-export';
import { OneVariableStatsDisplay } from './statistical-analyses/one-variable-stats/one-variable-stats-display';
import { HistogramComp } from './statistical-analyses/histogram/histogram-comp';
import { HistogramDisplay } from './statistical-analyses/histogram/histogram-display';
import { CriticalValueComp } from './statistical-analyses/critical-value/critical-value-comp';
import { CriticalValueDisplay } from './statistical-analyses/critical-value/critical-value-display';
import CriticalValueExport from './statistical-analyses/critical-value/critical-value-export';
import HistogramExport from './statistical-analyses/histogram/histogram-export';

export const NewOperations: Operation[] = [
	'critical-value', 'histogram'
];

export const OperationSchema = z.enum([
	'angle-angle-intersection',
	'differential-leveling',
	'direction-direction-intersection',
	'distance-distance-intersection',
	'geocentric-forwards',
	'ground-sampling-distance',
	'radii',
	'geocentric-inverse',
	'spcs-forwards',
	'spcs-inverse',
	'one-variable-stats',
	'histogram',
	'critical-value'
]);
export type Operation = z.infer<typeof OperationSchema>;

export const OperationCategorySchema = z.enum([
	'coordinate-computations',
	'coordinate-geometry',
	'geodetic-computations',
	'least-squares',
	'remote-sensing',
	'statistical-analyses'
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
		operations: ['geocentric-forwards', 'geocentric-inverse', 'spcs-forwards', 'spcs-inverse'],
	},
	'coordinate-geometry': {
		icon: COGO,
		name: 'Coordinate Geometry',
		operations: [
			'angle-angle-intersection',
			'direction-direction-intersection',
			'distance-distance-intersection',
		],
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
	'statistical-analyses': {
		icon: MdOutlineDataExploration,
		name: 'Statistical Analyses',
		operations: ['one-variable-stats', 'histogram', 'critical-value'],
	}
};

// Runs the comps for each operation.
export const OperationComp: { [key in Operation]: (data: any) => any } = {
	'differential-leveling': DifferentialLevelingComp,
	'radii': RadiiComp,
	'geocentric-forwards': GeocentricForwardsComp,
	'geocentric-inverse': GeocentricInverseComp,
	'ground-sampling-distance': GroundSamplingDistanceComp,
	'distance-distance-intersection': DistanceDistanceIntersectionComp,
	'direction-direction-intersection': DirectionDirectionIntersectionComp,
	'angle-angle-intersection': AngleAngleIntersectionComp,
	'spcs-forwards': SpcsForwardsComp,
	'spcs-inverse': SpcsInverseComp,
	'one-variable-stats': OneVariableStatsComp,
	'histogram': HistogramComp,
	'critical-value': CriticalValueComp
};

export const OperationDisplay: {
	[key in Operation]: (props: { data: any; result: any }) => JSX.Element | null;
} = {
	'differential-leveling': DifferentialLevelingDisplay,
	'radii': RadiiDisplay,
	'geocentric-forwards': GeocentricForwardsDisplay,
	'geocentric-inverse': GeocentricInverseDisplay,
	'ground-sampling-distance': GroundSamplingDistanceDisplay,
	'distance-distance-intersection': DistanceDistanceIntersectionDisplay,
	'direction-direction-intersection': DirectionDirectionIntersectionDisplay,
	'angle-angle-intersection': AngleAngleIntersectionDisplay,
	'spcs-forwards': SpcsForwardsDisplay,
	'spcs-inverse': SpcsInverseDisplay,
	'one-variable-stats': OneVariableStatsDisplay,
	'histogram': HistogramDisplay,
	'critical-value': CriticalValueDisplay
};

export const OperationDocs: { [key in OperationParsable]: CGDocs } = {
	'differential-leveling': DifferentialLevelingDocs,
	// 'geocentric-forwards': GeocentricForwardsDocs
};

export const OperationExport: {
	[key in Operation]?: (instance: any, format: any, settings: UserSettings) => string;
} = {
	'differential-leveling': DifferentialLevelingExport,
	'radii': RadiiExport,
	'geocentric-forwards': GeocentricForwardsExport,
	'geocentric-inverse': GeocentricInverseExport,
	'ground-sampling-distance': GroundSamplingDistanceExport,
	'distance-distance-intersection': DistanceDistanceIntersectionExport,
	'direction-direction-intersection': DirectionDirectionIntersectionExport,
	'angle-angle-intersection': AngleAngleIntersectionExport,
	'spcs-forwards': SpcsForwardsExport,
	'spcs-inverse': SpcsInverseExport,
	'one-variable-stats': OneVariableStatsExport,
	'critical-value': CriticalValueExport,
	'histogram': HistogramExport
};

export const OperationIcon: { [key in Operation]: IconType } = {
	'differential-leveling': MdStackedLineChart,
	'radii': MdRadar,
	'geocentric-forwards': XYZ,
	'geocentric-inverse': XYZ,
	'ground-sampling-distance': MdGridOn,
	'distance-distance-intersection': TbChartCircles,
	'direction-direction-intersection': MdShuffle,
	'angle-angle-intersection': MdShuffle,
	'spcs-forwards': SPCS,
	'spcs-inverse': SPCS,
	'one-variable-stats': MdShowChart,
	'histogram': MdBarChart,
	'critical-value': MdRunningWithErrors
};

// Display name of each operation.
export const OperationName: { [key in Operation]: string } = {
	'differential-leveling': 'Differential Leveling',
	'radii': 'Radii',
	'geocentric-forwards': 'Geocentric Forwards',
	'geocentric-inverse': 'Geocentric Inverse',
	'ground-sampling-distance': 'Ground Sampling Distance',
	'distance-distance-intersection': 'Distance-Distance Intersection',
	'direction-direction-intersection': 'Direction-Direction Intersection',
	'angle-angle-intersection': 'Angle-Angle Intersection',
	'spcs-forwards': 'State Plane Forwards',
	'spcs-inverse': 'State Plane Inverse',
	'one-variable-stats': 'One Variable Statistics',
	'histogram': 'Histogram',
	'critical-value': 'Critical Value'
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
