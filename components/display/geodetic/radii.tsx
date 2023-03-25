import {
	RadiiData,
	RadiiResults,
} from '../../../types/operation/geodetic/radii';
import {
	Badge,
	Box,
	Heading,
	HStack,
	StackDivider,
	VStack,
} from '@chakra-ui/react';
import FormatDMS from '../../../utils/format-dms';
import { radiansToDMS } from '../../../utils/angle';
import { DataAndResults } from '../display-common';

export default function RadiiDisplay(props: {
	data: RadiiData;
	results: RadiiResults;
}) {
	return (
		<DataAndResults
			data={[
				{ label: 'Ellipsoid', value: props.data.ellipsoid },
				{
					label: 'Latitude',
					value: FormatDMS(radiansToDMS(props.data.latitude)),
				},
				{
					label: 'Azimuth',
					value: FormatDMS(radiansToDMS(props.data.azimuth)),
				},
			]}
			results={[
				{
					label: 'Radius of Curvature in the Prime Vertical',
					value: props.results.radiusPrimeVertical.toLocaleString(),
				},
				{
					label: 'Radius of Curvature in the Meridian',
					value: props.results.radiusMeridian.toLocaleString(),
				},
				{
					label: 'Radius of Curvature in the Azimuth',
					value: props.results.radiusAzimuth.toLocaleString(),
				},
			]}
		/>
	);
}
