import { useOperationInstances } from '../../../hooks/use-operation-instances';
import { useEffect, useState } from 'react';
import { DistanceDistanceIntersectionResult } from '../../../operation/coordinate-geometry/distance-distance-intersection/distance-distance-intersection-result';
import { DistanceDistanceIntersectionData } from '../../../operation/coordinate-geometry/distance-distance-intersection/distance-distance-intersection-data';
import {
	Badge,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';
import router from 'next/router';
import { OperationInstance } from '../../../operation/operation-instance';
import { DistanceDistanceIntersectionComp } from '../../../operation/coordinate-geometry/distance-distance-intersection/distance-distance-intersection-comp';
import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import CommonPage from '../../../components/common-page';
import { CheckIcon } from '@chakra-ui/icons';
import { DistanceDistanceIntersectionDisplay } from '../../../operation/coordinate-geometry/distance-distance-intersection/distance-distance-intersection-display';
import { v4 as uuid } from 'uuid';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function DistanceDistanceIntersection(props: PreloadEditProps) {
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();
	const toast = useToast();

	// FORM DATA
	const [title, setTitle] = useState('');
	const [aX, setAX] = useState<number | null>(null);
	const [aY, setAY] = useState<number | null>(null);
	const [aR, setAR] = useState<number | null>(null);
	const [bX, setBX] = useState<number | null>(null);
	const [bY, setBY] = useState<number | null>(null);
	const [bR, setBR] = useState<number | null>(null);

	// TEMPORARY DATA
	const [tempData, setTempData] =
		useState<DistanceDistanceIntersectionData | null>(null);
	const [tempResult, setTempResult] =
		useState<DistanceDistanceIntersectionResult | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function submit() {
		if (
			aX === null ||
			aY === null ||
			aR === null ||
			bX === null ||
			bY === null ||
			bR === null
		) {
			return;
		}

		const payload: DistanceDistanceIntersectionData = {
			distance1: aR,
			distance2: bR,
			station1: { station: 'A', x: aX, y: aY },
			station2: { station: 'B', x: bX, y: bY },
		};

		let result: DistanceDistanceIntersectionResult;
		try {
			result = DistanceDistanceIntersectionComp(payload);
		} catch (e) {
			toast({
				title: 'Error',
				description: e instanceof Error ? e.message : 'There was an error.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
			return;
		}

		if (title === '') {
			// Temporary operation, just display a modal with the results
			setTempData(payload);
			setTempResult(result);
			onOpen();
			return;
		}

		const instance: OperationInstance = {
			data: payload,
			result: result,
			name: title.trim(),
			operation: 'distance-distance-intersection',
			new: true,
			timestamp: new Date().valueOf(),
			id: props.edit ?? uuid(),
		};

		if (props.edit) {
			updateInstance(props.edit, instance);
		} else {
			createInstance(instance);
		}
		router.push('/dashboard');
	}

	// Preload
	useEffect(() => {
		if (props.edit && operationInstances) {
			const instance = operationInstances.find(
				instance => instance.id === props.edit
			);
			if (instance) {
				const data = instance.data as DistanceDistanceIntersectionData;
				setTitle(instance.name);
				setAX(data.station1.x);
				setAY(data.station1.y);
				setAR(data.distance1);
				setBX(data.station2.x);
				setBY(data.station2.y);
				setBR(data.distance2);
			}
		}
	}, [props.edit, operationInstances]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Operation Results</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<DistanceDistanceIntersectionDisplay
							data={tempData!!}
							result={tempResult!!}
						/>
					</ModalBody>

					<ModalFooter>
						<Text fontSize="sm">
							This is a temporary operation. To save it to your list of
							operations, enter a title before submitting.
						</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<CommonPage
				title={'Distance-Distance Intersection'}
				description={
					'Calculates the intersection of two circles given their radii and the coordinates of their centers.'
				}
			>
				<VStack
					spacing={8}
					align={'start'}
				>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>1</Badge>Title
						</FormLabel>
						<Input
							type={'text'}
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
						<FormHelperText>
							Use a name that uniquely identifies this operation. If you would
							like to make this a temporary operation (the results are not
							saved), you can leave this field blank.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>2</Badge>Station A
						</FormLabel>
						<HStack align={'start'}>
							<Input
								type={'number'}
								value={aX ?? ''}
								onChange={e => setAX(parseFloat(e.target.value))}
								placeholder={'X'}
							/>
							<Input
								type={'number'}
								value={aY ?? ''}
								onChange={e => setAY(parseFloat(e.target.value))}
								placeholder={'Y'}
							/>
							<Input
								type={'number'}
								value={aR ?? ''}
								onChange={e => setAR(parseFloat(e.target.value))}
								placeholder={'Radius'}
							/>
						</HStack>
						<FormHelperText>
							The coordinates of the first station, and the radius of the
							circle.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Station B
						</FormLabel>
						<HStack align={'start'}>
							<Input
								type={'number'}
								value={bX ?? ''}
								onChange={e => setBX(parseFloat(e.target.value))}
								placeholder={'X'}
							/>
							<Input
								type={'number'}
								value={bY ?? ''}
								onChange={e => setBY(parseFloat(e.target.value))}
								placeholder={'Y'}
							/>
							<Input
								type={'number'}
								value={bR ?? ''}
								onChange={e => setBR(parseFloat(e.target.value))}
								placeholder={'Radius'}
							/>
						</HStack>
						<FormHelperText>
							The coordinates of the second station, and the radius of the
							circle.
						</FormHelperText>
					</FormControl>
					<Button
						leftIcon={<CheckIcon />}
						isDisabled={
							aX === null ||
							aY === null ||
							aR === null ||
							bX === null ||
							bY === null ||
							bR === null
						}
						onClick={submit}
					>
						{props.edit ? 'Save changes' : 'Submit'}
					</Button>
				</VStack>
			</CommonPage>
		</>
	);
}
