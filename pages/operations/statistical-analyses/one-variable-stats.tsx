import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { useOperationInstances } from '../../../hooks/use-operation-instances';
import { useEffect, useState } from 'react';
import {
	Badge,
	Box,
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
	Text, useColorModeValue,
	useDisclosure,
	VStack
} from '@chakra-ui/react';
import { OperationInstance } from '../../../operation/operation-instance';
import { v4 as uuid } from 'uuid';
import router from 'next/router';
import CommonPage from '../../../components/common-page';
import { CheckIcon } from '@chakra-ui/icons';
import {
	OneVariableStatsData
} from '../../../operation/statistical-analyses/one-variable-stats/one-variable-stats-data';
import {
	OneVariableStatsResult
} from '../../../operation/statistical-analyses/one-variable-stats/one-variable-stats-result';
import {
	OneVariableStatsComp
} from '../../../operation/statistical-analyses/one-variable-stats/one-variable-stats-comp';
import {
	OneVariableStatsDisplay
} from '../../../operation/statistical-analyses/one-variable-stats/one-variable-stats-display';
import Editor from 'react-simple-code-editor';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function OneVariableStats(props: PreloadEditProps) {
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();
	const bgColor = useColorModeValue('gray.100', 'gray.700');

	// FORM DATA
	const [title, setTitle] = useState('');
	const [data, setData] = useState<string>('');

	// TEMPORARY DATA
	const [tempData, setTempData] = useState<OneVariableStatsData | null>(null);
	const [tempResult, setTempResult] =
		useState<OneVariableStatsResult | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function submit() {
		if (!data) {
			return;
		}

		// Split input by anything that is not a number, a decimal point, or a minus sign
		const parsed = data.split(/[^0-9.-]/).filter(x => x !== '').map(x => parseFloat(x));

		const payload: OneVariableStatsData = {
			values: parsed
		};
		const result = OneVariableStatsComp(payload);

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
			operation: 'one-variable-stats',
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
				const data = instance.data as OneVariableStatsData;
				setTitle(instance.name);
				setData(data.values.join(' '));
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
						<OneVariableStatsDisplay
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
				title={'One Variable Statistics'}
				description={
					'Performs statistical analysis on a single variable.'
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
							<Badge mr={2}>2</Badge>Data
						</FormLabel>
						<Box
							bgColor={bgColor}
							borderRadius={'base'}
							width={'100%'}
						>
							<Editor
								onValueChange={data => {
									setData(data);
								}}
								value={data}
								highlight={data => data}
								padding={10}
								style={{
									fontFamily: '"Roboto Mono", monospace',
									minHeight: '10rem',
								}}
							/>
						</Box>
						<FormHelperText>
							Enter numbers separated by commas, tabs, new lines, or spaces.
							If numbers contain digit grouping commas, remove them before
							entering them here.
						</FormHelperText>
					</FormControl>
					<Button
						leftIcon={<CheckIcon />}
						isDisabled={!data}
						onClick={submit}
					>
						{props.edit ? 'Save changes' : 'Submit'}
					</Button>
				</VStack>
			</CommonPage>
		</>
	);
}