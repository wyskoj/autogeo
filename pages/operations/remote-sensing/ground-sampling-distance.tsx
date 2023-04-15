import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { useOperationInstances } from '../../../hooks/use-operation-instances';
import { useEffect, useState } from 'react';
import { GroundSamplingDistanceData } from '../../../operation/remote-sensing/ground-sampling-distance/ground-sampling-distance-data';
import { OperationInstance } from '../../../operation/operation-instance';
import { GroundSamplingDistanceComp } from '../../../operation/remote-sensing/ground-sampling-distance/ground-sampling-distance-comp';
import {
	Badge,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { GroundSamplingDistanceResult } from '../../../operation/remote-sensing/ground-sampling-distance/ground-sampling-distance-result';
import { v4 as uuid } from 'uuid';
import router from 'next/router';
import { GroundSamplingDistanceDisplay } from '../../../operation/remote-sensing/ground-sampling-distance/ground-sampling-distance-display';
import CommonPage from '../../../components/common-page';
import { CheckIcon } from '@chakra-ui/icons';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function GroundSamplingDistanceForm(props: PreloadEditProps) {
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();

	// FORM DATA
	const [title, setTitle] = useState('');
	const [scanningResolution, setScanningResolution] = useState<number | null>(
		null
	);
	const [scaleDenominator, setScaleDenominator] = useState<number | null>(null);

	// TEMPORARY DATA
	const [tempData, setTempData] = useState<GroundSamplingDistanceData | null>(
		null
	);
	const [tempResult, setTempResult] =
		useState<GroundSamplingDistanceResult | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function submit() {
		if (!scanningResolution || !scaleDenominator) {
			return;
		}
		const payload: GroundSamplingDistanceData = {
			scanningResolution: scanningResolution,
			scaleDenominator: scaleDenominator,
		};
		const result = GroundSamplingDistanceComp(payload);

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
			operation: 'ground-sampling-distance',
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
				const data = instance.data as GroundSamplingDistanceData;
				setTitle(instance.name);
				setScanningResolution(data.scanningResolution);
				setScaleDenominator(data.scaleDenominator);
			}
		}
	}, [operationInstances, props.edit]);

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
						<GroundSamplingDistanceDisplay
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
				title={'Ground Sampling Distance'}
				description={
					'Calculates the ground sampling distance of an aerial image.'
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
							<Badge mr={2}>2</Badge>Scanning resolution
						</FormLabel>
						<Input
							type={'number'}
							value={scanningResolution ?? ''}
							onChange={e => setScanningResolution(parseFloat(e.target.value))}
						/>
						<FormHelperText>
							The scanning resolution of the aerial image, in dots per inch.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Scale denominator
						</FormLabel>
						<Input
							type={'number'}
							value={scaleDenominator ?? ''}
							onChange={e => setScaleDenominator(parseFloat(e.target.value))}
						/>
						<FormHelperText>
							The scale denominator of the aerial image.
						</FormHelperText>
					</FormControl>
					<Button
						leftIcon={<CheckIcon />}
						isDisabled={!scanningResolution || !scaleDenominator}
						onClick={submit}
					>
						{props.edit ? 'Save changes' : 'Submit'}
					</Button>
				</VStack>
			</CommonPage>
		</>
	);
}
