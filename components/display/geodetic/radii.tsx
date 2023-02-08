import {
	RadiiData,
	RadiiResult,
} from '../../../types/operation/geodetic/radii';
import {
	Badge,
	Box,
	Heading,
	HStack,
	StackDivider,
	VStack,
} from '@chakra-ui/react';
import DMS from '../../../utils/format-dms';

export default function RadiiDisplay(props: {
	data: RadiiData;
	results: RadiiResult;
}) {
	return (
		<HStack
			divider={<StackDivider />}
			spacing={4}
			align={'start'}
			width={'100%'}
		>
			<VStack
				align={'start'}
				spacing={4}
				width={'50%'}
			>
				<Heading
					as="h4"
					size="md"
				>
					Data
				</Heading>
				<Box>
					<Heading
						as="h5"
						size="sm"
					>
						Ellipsoid
					</Heading>
					<Badge>{props.data.ellipsoid}</Badge>
				</Box>
				<Box>
					<Heading
						as="h5"
						size="sm"
					>
						Latitude
					</Heading>
					<Badge>{DMS(props.data.latitude)}</Badge>
				</Box>
				<Box>
					<Heading
						as="h5"
						size="sm"
					>
						Azimuth
					</Heading>
					<Badge>{DMS(props.data.azimuth)}</Badge>
				</Box>
			</VStack>
			<VStack
				align={'start'}
				spacing={4}
				width={'50%'}
			>
				<Heading
					as="h4"
					size="md"
				>
					Results
				</Heading>
				<Box>
					<Heading
						as="h5"
						size="sm"
					>
						Radius of Curvature in the Prime Vertical
					</Heading>
					<Badge>{props.results.radiusPrimeVertical.toLocaleString()}</Badge>
				</Box>
				<Box>
					<Heading
						as="h5"
						size="sm"
					>
						Radius of Curvature in the Prime Meridian
					</Heading>
					<Badge>{props.results.radiusMeridian.toLocaleString()}</Badge>
				</Box>
				<Box>
					<Heading
						as="h5"
						size="sm"
					>
						Radius of Curvature at Azimuth
					</Heading>
					<Badge>{props.results.radiusAzimuthal.toLocaleString()}</Badge>
				</Box>
			</VStack>
		</HStack>
	);
}
