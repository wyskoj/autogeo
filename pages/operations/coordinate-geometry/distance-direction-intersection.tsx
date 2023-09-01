import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { useOperationInstances } from '../../../hooks/use-operation-instances';
import {
	Badge, Button,
	FormControl, FormHelperText, FormLabel, HStack, Input,
	Modal, ModalBody,
	ModalCloseButton,
	ModalContent, ModalFooter,
	ModalHeader,
	ModalOverlay, Text,
	useDisclosure,
	useToast, VStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useDMS from '../../../hooks/use-dms';
import {
	DistanceDirectionIntersectionData
} from '../../../operation/coordinate-geometry/distance-direction-intersection/distance-direction-intersection-data';
import {
	DistanceDirectionIntersectionResult
} from '../../../operation/coordinate-geometry/distance-direction-intersection/distance-direction-intersection-result';
import {
	AngleAngleIntersectionData
} from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-data';
import { DMSToRadiansT, radiansToDMS } from '../../../utils/angle';
import {
	AngleAngleIntersectionResult
} from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-result';
import {
	AngleAngleIntersectionComp
} from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-comp';
import { OperationInstance } from '../../../operation/operation-instance';
import { v4 as uuid } from 'uuid';
import router from 'next/router';
import {
	DistanceDirectionIntersectionComp
} from '../../../operation/coordinate-geometry/distance-direction-intersection/distance-direction-intersection-comp';
import {
	AngleAngleIntersectionDisplay
} from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-display';
import CommonPage from '../../../components/common-page';
import AngleInput from '../../../components/angle-input';
import { CheckIcon } from '@chakra-ui/icons';
import {
	DistanceDirectionIntersectionDisplay
} from '../../../operation/coordinate-geometry/distance-direction-intersection/distance-direction-intersection-display';
import { OperationDescription, OperationName } from '../../../operation/operation';
import StepLabel from '../../../components/operation-input/step-label';
import { toDegrees } from 'chart.js/helpers';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null
		} satisfies PreloadEditProps
	};
}

export default function DistanceDirectionIntersection(props: PreloadEditProps) {
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();
	const toast = useToast();

	// FORM DATA
	const [title, setTitle] = useState('');
	const [AX, setAX] = useState<number | null>(null);
	const [AY, setAY] = useState<number | null>(null);
	const [BX, setBX] = useState<number | null>(null);
	const [BY, setBY] = useState<number | null>(null);
	const [azimuth, setAzimuthDMS, setAzimuthDD] = useDMS();
	const [distance, setDistance] = useState<number | null>(null);

	// TEMPORARY DATA
	const [tempData, setTempData] = useState<DistanceDirectionIntersectionData | null>(
		null
	);
	const [tempResult, setTempResult] =
		useState<DistanceDirectionIntersectionResult | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function submit() {
		if (
			AX === null ||
			AY === null ||
			BX === null ||
			BY === null ||
			azimuth === null ||
			distance === null
		) {
			return;
		}

		const payload: DistanceDirectionIntersectionData = {
			point1: { x: AX, y: AY, station: 'A' },
			point2: { x: BX, y: BY, station: 'B' },
			azimuth: DMSToRadiansT(azimuth),
			distance: distance
		};

		let result: DistanceDirectionIntersectionResult;
		try {
			result = DistanceDirectionIntersectionComp(payload);
		} catch (e) {
			toast({
				title: 'Error',
				description: e instanceof Error ? e.message : 'There was an error.',
				status: 'error',
				duration: 5000,
				isClosable: true
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
			operation: 'distance-direction-intersection',
			new: true,
			timestamp: new Date().valueOf(),
			id: props.edit ?? uuid()
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
				const data = instance.data as DistanceDirectionIntersectionData;
				setTitle(instance.name);
				setAX(data.point1.x);
				setAY(data.point1.y);
				setBX(data.point2.x);
				setBY(data.point2.y);
				setAzimuthDD(toDegrees(data.azimuth));
				setDistance(data.distance);
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
						{
							<DistanceDirectionIntersectionDisplay
								data={tempData!!}
								result={tempResult!!}
							/>
						}
					</ModalBody>

					<ModalFooter>
						<Text fontSize='sm'>
							This is a temporary operation. To save it to your list of
							operations, enter a title before submitting.
						</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<CommonPage
				title={OperationName['distance-direction-intersection']}
				description={
					OperationDescription['distance-direction-intersection']
				}
			>
				<VStack
					spacing={8}
					align={'start'}
				>
					{/* TITLE */}
					<FormControl>
						<StepLabel stepNumber={1} title={'Title'} />
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
					{/* STATION 1 */}
					<FormControl>
						<StepLabel stepNumber={2} title={'Station 1'} />
						<VStack align={'start'}>
							<HStack align={'start'}>
								<Input
									type={'number'}
									value={AX ?? ''}
									onChange={e => setAX(parseFloat(e.target.value))}
									placeholder={'X'}
								/>
								<Input
									type={'number'}
									value={AY ?? ''}
									onChange={e => setAY(parseFloat(e.target.value))}
									placeholder={'Y'}
								/>
							</HStack>
							<AngleInput
								DMS={azimuth}
								setDMS={setAzimuthDMS}
							/>
							<FormHelperText>Station on line</FormHelperText>
						</VStack>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Station 2
						</FormLabel>
						<VStack align={'start'}>
							<HStack align={'start'}>
								<Input
									type={'number'}
									value={BX ?? ''}
									onChange={e => setBX(parseFloat(e.target.value))}
									placeholder={'X'}
								/>
								<Input
									type={'number'}
									value={BY ?? ''}
									onChange={e => setBY(parseFloat(e.target.value))}
									placeholder={'Y'}
								/>
							</HStack>
							<Input
								type={'number'}
								value={distance ?? ''}
								onChange={e => setDistance(parseFloat(e.target.value))}
								placeholder={'Distance'}
							/>
							<FormHelperText>Station forming radius</FormHelperText>
						</VStack>
					</FormControl>
					<Button
						leftIcon={<CheckIcon />}
						isDisabled={
							AX === null ||
							AY === null ||
							BX === null ||
							BY === null ||
							azimuth === null ||
							distance === null
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