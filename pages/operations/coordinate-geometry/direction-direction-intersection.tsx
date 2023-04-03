import { v4 as uuid } from 'uuid';
import useDMS from '../../../hooks/use-dms';
import { DirectionDirectionIntersectionData } from '../../../operation/coordinate-geometry/direction-direction-intersection/direction-direction-intersection-data';
import { DirectionDirectionIntersectionResult } from '../../../operation/coordinate-geometry/direction-direction-intersection/direction-direction-intersection-result';
import { useEffect, useState } from 'react';
import { DirectionDirectionIntersectionComp } from '../../../operation/coordinate-geometry/direction-direction-intersection/direction-direction-intersection-comp';
import { OperationInstance } from '../../../operation/operation-instance';
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
	useDisclosure,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import CommonPage from '../../../components/common-page';
import { GetServerSidePropsContext } from 'next';
import { useOperationInstances } from '../../../hooks/operation-instances';
import { CheckIcon } from '@chakra-ui/icons';
import router from 'next/router';
import { DMSToRadiansT, radiansToDMS } from '../../../utils/angle';
import { DirectionDirectionIntersectionDisplay } from '../../../operation/coordinate-geometry/direction-direction-intersection/direction-direction-intersection-display';
import AngleInput from '../../../components/angle-input';

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
	const [aDMS, setADMS, setADD] = useDMS();
	const [bX, setBX] = useState<number | null>(null);
	const [bY, setBY] = useState<number | null>(null);
	const [bDMS, setBDMS, setBDD] = useDMS();

	// TEMPORARY DATA
	const [tempData, setTempData] =
		useState<DirectionDirectionIntersectionData | null>(null);
	const [tempResult, setTempResult] =
		useState<DirectionDirectionIntersectionResult | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function submit() {
		if (aX === null || aY === null || bX === null || bY === null) {
			return;
		}

		const payload: DirectionDirectionIntersectionData = {
			azimuth1: DMSToRadiansT(aDMS),
			azimuth2: DMSToRadiansT(bDMS),
			station1: { x: aX, y: aY, station: 'A' },
			station2: { x: bX, y: bY, station: 'B' },
		};
		let result: DirectionDirectionIntersectionResult;
		try {
			result = DirectionDirectionIntersectionComp(payload);
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
			operation: 'direction-direction-intersection',
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
				const data = instance.data as DirectionDirectionIntersectionData;
				setTitle(instance.name);
				setAX(data.station1.x);
				setAY(data.station1.y);
				setBX(data.station2.x);
				setBY(data.station2.y);
				setADD((180 / Math.PI) * data.azimuth1);
				setBDD((180 / Math.PI) * data.azimuth2);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
						<DirectionDirectionIntersectionDisplay
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
				title={'Direction-Direction Intersection'}
				description={
					'Find the intersection of two lines given their azimuths and points on the lines.'
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
						<VStack align={'start'}>
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
							</HStack>

							<AngleInput
								DMS={aDMS}
								setDMS={setADMS}
							/>
						</VStack>
						<FormHelperText>
							The coordinates of the first station, and the azimuth of the line
							from the first station.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Station B
						</FormLabel>
						<VStack align={'start'}>
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
							</HStack>

							<AngleInput
								DMS={bDMS}
								setDMS={setBDMS}
							/>
						</VStack>
						<FormHelperText>
							The coordinates of the second station, and the azimuth of the line
							from the second station.
						</FormHelperText>
					</FormControl>
					<Button
						leftIcon={<CheckIcon />}
						isDisabled={
							aX === null || aY === null || bX === null || bY === null
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
