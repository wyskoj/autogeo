import { Operation } from '../types/operation';
import { useDisclosure } from '@chakra-ui/hooks';
import {
	Box,
	Heading,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';
import { MathComponent } from 'mathjax-react';

const helpItems: {
	[key in Operation]: {
		[parameter: string]: { title: string; body: JSX.Element };
	};
} = {
	'differential-leveling': {
		'weighting-scheme': {
			title: 'Weighting Scheme',
			body: (
				<VStack
					spacing={4}
					align={'start'}
				>
					<Text fontSize="md">
						Weighting schemes are used to adjust the observations to account for{' '}
						<strong>variable observation errors</strong>. The weighting scheme
						is applied to the observations during the least-squares operation.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Directions
					</Heading>
					<Text fontSize="md">
						Select a weighting scheme. If not unweighted, enter the weight value
						for each observation in the <em>Observations</em> data table.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Options
					</Heading>
					<Box ml={4}>
						<UnorderedList>
							<ListItem>
								<strong>Unweighted</strong> &mdash; Equal weight is given to all
								observations. This is the default option.
								<MathComponent tex={`w=1`} />
							</ListItem>
							<ListItem>
								<strong>Normal</strong> &mdash; The weight of each observation
								is equal to the entered value.
								<MathComponent tex={`w=w`} />
							</ListItem>
							<ListItem>
								<strong>Distance</strong> &mdash; The weight of each observation
								is inversely proportional to the distance between the two
								stations.
								<MathComponent tex={`w=\\frac{1}{\\text{length}}`} />
							</ListItem>
							<ListItem>
								<strong>Standard deviations</strong> &mdash; The weight of each
								observation is inversely proportional to the standard deviation
								of the observation squared.
								<MathComponent tex={`w=\\frac{1}{\\sigma^2}`} />
							</ListItem>
						</UnorderedList>
					</Box>
				</VStack>
			),
		},
		'benchmarks': {
			title: 'Benchmarks',
			body: (
				<VStack
					spacing={4}
					align={'start'}
				>
					<Text fontSize="md">
						Level nets are established using one or more benchmarks&mdash;
						<strong>a station with a known or assumed elevation</strong>. The
						elevation of the benchmark is used to adjust the elevations of the
						other stations in the level net.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Directions
					</Heading>
					<Text fontSize="md">
						Enter the name of station that is the benchmark, along with the
						elevation of the benchmark.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Fields
					</Heading>
					<Box ml={4}>
						<UnorderedList>
							<ListItem>
								<strong>Station</strong> &mdash; The alphanumeric name (or code)
								of the station used as a benchmark.
							</ListItem>
							<ListItem>
								<strong>Elevation</strong> &mdash; The known or assumed
								elevation of the benchmark.
							</ListItem>
						</UnorderedList>
					</Box>
				</VStack>
			),
		},
		'observations': {
			title: 'Observations',
			body: (
				<VStack
					spacing={4}
					align={'start'}
				>
					<Text fontSize="md">
						Level nets are defined by a series of observations between two
						stations. Each observation is a measurement of the{' '}
						<strong>difference in elevation</strong>.
					</Text>
					<Heading
						as="h4"
						size="md"
					>
						Directions
					</Heading>
					<Text fontSize="md">Enter the details of each observation.</Text>
					<Heading
						as="h4"
						size="md"
					>
						Fields
					</Heading>
					<Box ml={4}>
						<UnorderedList>
							<ListItem>
								<strong>From</strong> &mdash; The name of the station from which
								the observation was made.
							</ListItem>
							<ListItem>
								<strong>To</strong> &mdash; The name of the station to which the
								observation was made.
							</ListItem>
							<ListItem>
								<strong>Δ Elevation</strong> &mdash; The difference in elevation
								between the two stations.
							</ListItem>
							<ListItem>
								<strong>Weight</strong>* &mdash; The weight of the observation,
								as determined by the weighting scheme.
							</ListItem>
						</UnorderedList>
						<Text
							fontSize="sm"
							mt={8}
						>
							*The weight is only definable when the weighting scheme is not set
							to &ldquo;Unweighted&rdquo;.
						</Text>
					</Box>
				</VStack>
			),
		},
	},
	'3d-geodetic': {},
	'azimuth-reduction': {},
	'horizontal-adjustment': {},
	'predict-position': {},
	'solar-shot-reduction': {},
	'star-shot-reduction': {},
};

/**
 * Hook to display help for a given operation.
 *
 * The hook takes an {@link Operation} and returns a function that can be used to
 * display the help for a given parameter.
 *
 * @example
 * const help = useHelp('differential-leveling');
 * help('weighting-scheme'); // opens the modal with the help for the weighting scheme
 *
 * @param operation
 */
export default function useHelp(operation: Operation) {
	// collect the help items for the given operation
	const items = helpItems[operation];

	function HelpModal(parameter: string, index: number) {
		const { isOpen, onOpen, onClose } = useDisclosure();
		return [
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				key={index}
				size={'xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<Heading
							as="h3"
							size="lg"
						>
							{items[parameter].title}
						</Heading>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{items[parameter].body}</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>,
			onOpen,
		] as const;
	}

	// build modals
	const modals = Object.fromEntries(
		Object.entries(items).map(([parameter, item], index) => [
			parameter,
			HelpModal(parameter, index),
		])
	);

	// convert the modals object to an array
	const modalArray = Object.values(modals).map(([modal]) => modal);

	// return both the modals and a function to display the help for a given parameter
	return [modalArray, (parameter: string) => modals[parameter][1]()] as const;
}
