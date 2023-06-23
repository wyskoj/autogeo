import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { useOperationInstances } from '../../../hooks/use-operation-instances';
import {
	Badge,
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Radio,
	RadioGroup,
	Stack,
	useColorModeValue,
	VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { OperationInstance } from '../../../operation/operation-instance';
import { v4 as uuid } from 'uuid';
import router from 'next/router';
import CommonPage from '../../../components/common-page';
import Editor from 'react-simple-code-editor';
import { CheckIcon } from '@chakra-ui/icons';
import {
	HistogramBucketType,
	HistogramData,
} from '../../../operation/statistical-analyses/histogram/histogram-data';
import { HistogramComp } from '../../../operation/statistical-analyses/histogram/histogram-comp';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

const descriptions: { [key in HistogramBucketType]: string } = {
	count: 'Specify the number of buckets.',
	width: 'Specify the width of each bucket.',
	stddev: 'Specify the number of standard deviations per bucket.',
};

const placeholders: { [key in HistogramBucketType]: string } = {
	count: 'Bucket count',
	width: 'Bucket width',
	stddev: 'Bucket standard deviation width',
};

export default function Histogram(props: PreloadEditProps) {
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();
	const bgColor = useColorModeValue('gray.100', 'gray.700');

	// FORM DATA
	const [title, setTitle] = useState('');
	const [data, setData] = useState<string>('');
	const [bucketType, setBucketType] = useState<HistogramBucketType>('count');
	const [bucketValue, setBucketValue] = useState<number | null>(null);

	console.log({ title, data, bucketType, bucketValue });

	function submit() {
		if (!data || !title || !bucketType) {
			return;
		}

		// Split input by anything that is not a number, a decimal point, or a minus sign
		const parsed = data
			.split(/[^0-9.-]/)
			.filter(x => x !== '')
			.map(x => parseFloat(x));

		const payload: HistogramData = {
			values: parsed,
			bucket: {
				type: bucketType,
				value: bucketValue ?? 1,
			},
		};
		const result = HistogramComp(payload);

		const instance: OperationInstance = {
			data: payload,
			result: result,
			name: title.trim(),
			operation: 'histogram',
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
				const data = instance.data as HistogramData;
				setTitle(instance.name);
				setData(data.values.join(' '));
				setBucketType(data.bucket.type);
				setBucketValue(data.bucket.value);
			}
		}
	}, [operationInstances, props.edit]);

	return (
		<>
			<CommonPage
				title={'Histogram'}
				description={'Generate a frequency-based histogram.'}
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
							Use a name that uniquely identifies this operation.
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
							Enter numbers separated by commas, tabs, line breaks, or spaces. If
							numbers contain digit-grouping commas, remove them before submitting.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Buckets
						</FormLabel>
						<RadioGroup
							defaultValue="unweighted"
							onChange={nextValue => {
								try {
									setBucketType(nextValue as HistogramBucketType);
									if (nextValue === 'count') {
										setBucketValue(parseInt(bucketValue as any));
									}
								} catch (e) {
									console.warn('Attempt to set bucket type failed.', e);
								}
							}}
							value={bucketType}
						>
							<Stack direction={['column', 'column', 'row']}>
								<Radio value="count">Count</Radio>
								<Radio value="width">Width</Radio>
								<Radio value="stddev">Standard deviations</Radio>
							</Stack>
						</RadioGroup>
						<FormHelperText>{descriptions[bucketType]}</FormHelperText>
						<Input
							type={'number'}
							value={bucketValue ?? ''}
							onChange={e => {
								if (bucketType !== 'count') {
									setBucketValue(parseFloat(e.target.value));
								} else {
									setBucketValue(parseInt(e.target.value));
								}
							}}
							mt={2}
							placeholder={placeholders[bucketType]}
						/>
					</FormControl>
					<Button
						leftIcon={<CheckIcon />}
						isDisabled={!data || !title || !bucketType || !bucketValue}
						onClick={submit}
					>
						{props.edit ? 'Save changes' : 'Submit'}
					</Button>
				</VStack>
			</CommonPage>
		</>
	);
}
