import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { useOperationInstances } from '../../../hooks/use-operation-instances';
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
import { useState } from 'react';
import useDMS from '../../../hooks/use-dms';
import { AngleAngleIntersectionData } from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-data';
import { AngleAngleIntersectionResult } from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-result';
import { DMSToRadiansT } from '../../../utils/angle';
import { AngleAngleIntersectionComp } from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-comp';
import { OperationInstance } from '../../../operation/operation-instance';
import { v4 as uuid } from 'uuid';
import router from 'next/router';
import CommonPage from '../../../components/common-page';
import { CheckIcon } from '@chakra-ui/icons';
import { AngleAngleIntersectionDisplay } from '../../../operation/coordinate-geometry/angle-angle-intersection/angle-angle-intersection-display';
import AngleInput from '../../../components/angle-input';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function AngleAngleIntersection(props: PreloadEditProps) {
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();
	const toast = useToast();

	// FORM DATA
	const [title, setTitle] = useState('');
	const [O1X, setO1X] = useState<number | null>(null);
	const [O1Y, setO1Y] = useState<number | null>(null);
	const [B1X, setB1X] = useState<number | null>(null);
	const [B1Y, setB1Y] = useState<number | null>(null);
	const [O2X, setO2X] = useState<number | null>(null);
	const [O2Y, setO2Y] = useState<number | null>(null);
	const [B2X, setB2X] = useState<number | null>(null);
	const [B2Y, setB2Y] = useState<number | null>(null);
	const [dms1, setDMS1, setDD1] = useDMS();
	const [dms2, setDMS2, setDD2] = useDMS();

	// TEMPORARY DATA
	const [tempData, setTempData] = useState<AngleAngleIntersectionData | null>(
		null
	);
	const [tempResult, setTempResult] =
		useState<AngleAngleIntersectionResult | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function submit() {
		if (
			O1X === null ||
			O1Y === null ||
			B1X === null ||
			B1Y === null ||
			O2X === null ||
			O2Y === null ||
			B2X === null ||
			B2Y === null ||
			dms1 === null ||
			dms2 === null
		) {
			return;
		}

		const payload: AngleAngleIntersectionData = {
			angleFromStation1: DMSToRadiansT(dms1),
			angleFromStation2: DMSToRadiansT(dms2),
			backsightStation1: { station: 'B1', x: B1X, y: B1Y },
			backsightStation2: { station: 'B2', x: B2X, y: B2Y },
			occupiedStation1: { station: 'O1', x: O1X, y: O1Y },
			occupiedStation2: { station: 'O2', x: O2X, y: O2Y },
		};

		let result: AngleAngleIntersectionResult;
		try {
			result = AngleAngleIntersectionComp(payload);
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
			operation: 'angle-angle-intersection',
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
						<AngleAngleIntersectionDisplay
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
				title={'Angle-Angle Intersection'}
				description={
					'Finds the intersection of two lines defined by two stations and two angles.'
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
							<Badge mr={2}>2</Badge>Station 1
						</FormLabel>
						<VStack align={'start'}>
							<FormHelperText>Occupied station</FormHelperText>
							<HStack align={'start'}>
								<Input
									type={'number'}
									value={O1X ?? ''}
									onChange={e => setO1X(parseFloat(e.target.value))}
									placeholder={'X'}
								/>
								<Input
									type={'number'}
									value={O1Y ?? ''}
									onChange={e => setO1Y(parseFloat(e.target.value))}
									placeholder={'Y'}
								/>
							</HStack>
							<FormHelperText>Backsight station</FormHelperText>
							<HStack align={'start'}>
								<Input
									type={'number'}
									value={B1X ?? ''}
									onChange={e => setB1X(parseFloat(e.target.value))}
									placeholder={'X'}
								/>
								<Input
									type={'number'}
									value={B1Y ?? ''}
									onChange={e => setB1Y(parseFloat(e.target.value))}
									placeholder={'Y'}
								/>
							</HStack>
							<FormHelperText>Angle from station</FormHelperText>
							<AngleInput
								DMS={dms1}
								setDMS={setDMS1}
							/>
						</VStack>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Station 2
						</FormLabel>
						<VStack align={'start'}>
							<FormHelperText>Occupied station</FormHelperText>
							<HStack align={'start'}>
								<Input
									type={'number'}
									value={O2X ?? ''}
									onChange={e => setO2X(parseFloat(e.target.value))}
									placeholder={'X'}
								/>
								<Input
									type={'number'}
									value={O2Y ?? ''}
									onChange={e => setO2Y(parseFloat(e.target.value))}
									placeholder={'Y'}
								/>
							</HStack>
							<FormHelperText>Backsight station</FormHelperText>
							<HStack align={'start'}>
								<Input
									type={'number'}
									value={B2X ?? ''}
									onChange={e => setB2X(parseFloat(e.target.value))}
									placeholder={'X'}
								/>
								<Input
									type={'number'}
									value={B2Y ?? ''}
									onChange={e => setB2Y(parseFloat(e.target.value))}
									placeholder={'Y'}
								/>
							</HStack>
							<FormHelperText>Angle from station</FormHelperText>
							<AngleInput
								DMS={dms2}
								setDMS={setDMS2}
							/>
						</VStack>
					</FormControl>
					<Button
						leftIcon={<CheckIcon />}
						isDisabled={
							O1X === null ||
							O1Y === null ||
							B1X === null ||
							B1Y === null ||
							O2X === null ||
							O2Y === null ||
							B2X === null ||
							B2Y === null
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
