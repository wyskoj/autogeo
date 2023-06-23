import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { useOperationInstances } from '../../../hooks/use-operation-instances';
import {
	Alert, AlertDescription, AlertIcon, AlertTitle,
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
	Radio,
	RadioGroup,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
	VStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { OperationInstance } from '../../../operation/operation-instance';
import { v4 as uuid } from 'uuid';
import router from 'next/router';
import CommonPage from '../../../components/common-page';
import { CheckIcon } from '@chakra-ui/icons';
import {
	CriticalValueData,
	Distribution,
} from '../../../operation/statistical-analyses/critical-value/critical-value-data';
import { CriticalValueComp } from '../../../operation/statistical-analyses/critical-value/critical-value-comp';
import { CriticalValueResult } from '../../../operation/statistical-analyses/critical-value/critical-value-result';
import { CriticalValueDisplay } from '../../../operation/statistical-analyses/critical-value/critical-value-display';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function CriticalValue(props: PreloadEditProps) {
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();

	// FORM DATA
	const [title, setTitle] = useState('');
	const [distribution, setDistribution] = useState<Distribution>('normal');

	const [normalProb, setNormalProb] = useState<number | null>(null);

	// TEMPORARY DATA
	const [tempData, setTempData] = useState<CriticalValueData | null>(null);
	const [tempResult, setTempResult] = useState<CriticalValueResult | null>(
		null
	);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function submit() {
		let payload: CriticalValueData;
		switch (distribution) {
			case 'normal':
				payload = {
					type: 'normal',
					probability: normalProb! / 100,
				};
				break;
			default:
				throw new Error('Invalid distribution');
		}
		const result = CriticalValueComp(payload);

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
			operation: 'critical-value',
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
				const data = instance.data as CriticalValueData;
				setTitle(instance.name);
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
						<CriticalValueDisplay
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
				title={'Critical Value'}
				description={
					'Calculates the critical value for a given significance level and degrees of freedom.'
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
							<Badge mr={2}>2</Badge>Distribution
						</FormLabel>
						<RadioGroup
							defaultValue="unweighted"
							onChange={nextValue => {
								try {
									setDistribution(nextValue as Distribution);
								} catch (e) {
									console.warn('Attempt to set distribution failed.', e);
								}
							}}
							value={distribution}
						>
							<Stack direction={['column', 'column', 'row']}>
								<Radio value="normal" >Normal</Radio>
								<Radio value="chi-squared" isDisabled={true}>Chi-Squared</Radio>
								<Radio value="t" isDisabled={true}>
									Student&apos;s <em>t</em>
								</Radio>
								<Radio value="f" isDisabled={true}>Fisher-Snedecor</Radio>
							</Stack>
						</RadioGroup>
						<Alert status="info" mt={4} borderRadius={'lg'}>
							<AlertIcon />
							<AlertTitle>Coming soon</AlertTitle>
							<AlertDescription>
								Additional distributions will be implemented in the future.
							</AlertDescription>
						</Alert>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Parameters
						</FormLabel>
						<Input
							type={'number'}
							value={normalProb ?? ''}
							placeholder={'Percent probability (0–100)'}
							onChange={e => setNormalProb(Number(e.target.value))}
						/>
						<FormHelperText>
							Enter the percent probability (0–100) for the critical value.
						</FormHelperText>
					</FormControl>
					<Button
						leftIcon={<CheckIcon />}
						isDisabled={false}
						onClick={submit}
					>
						{props.edit ? 'Save changes' : 'Submit'}
					</Button>
				</VStack>
			</CommonPage>
		</>
	);
}