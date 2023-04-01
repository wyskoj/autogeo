import CommonPage from '../../components/common-page';
import Editor from 'react-simple-code-editor';
import { useState } from 'react';
import {
	Box,
	Button,
	HStack,
	SimpleGrid,
	Spinner,
	Tooltip,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { v4 as uuid } from 'uuid';
import { CheckIcon } from '@chakra-ui/icons';
import { useOperationInstances } from '../../hooks/operation-instances';
import { GetServerSidePropsContext } from 'next';
import { PreloadOperationProps } from '../../types/operation/preload-props';
import { GhilaniDocs } from '../../cg-docs/docs-common';
import { OperationInstance } from '../../operation/operation-instance';
import {
	Operation,
	OperationComp,
	OperationDocs,
	OperationParsable,
	OperationParse,
	OperationSchema
} from '../../operation/operation';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const operation = context.query['operation'];
	return {
		props: {
			operation: operation
				? Array.isArray(operation)
					? operation[0]
					: operation
				: null,
		} satisfies PreloadOperationProps,
	};
}

export default function PlainEditor(props: PreloadOperationProps) {
	// USER ENTERED CODE
	const [code, setCode] = useState('');
	const [isCodeGood, setIsCodeGood] = useState(false);
	const bgColor = useColorModeValue('gray.100', 'gray.700');

	const toast = useToast();
	const router = useRouter();
	const [waiting, setWaiting] = useState(false);

	const { createInstance } = useOperationInstances();

	const operationParse = OperationSchema.safeParse(props.operation);
	if (!operationParse.success) {
		// gtfo if operation is bad
		router.push('/operations');
		return <></>;
	}
	const operation = operationParse.data as Operation;

	function submit() {
		if (!operationParse.success) return;
		setWaiting(true);
		let parse = OperationParse[operation as OperationParsable];
		let operate = OperationComp[operation];
		const { title, data } = parse(code);
		const result = operate(data);
		const instance: OperationInstance = {
			data,
			id: uuid(),
			name: title.trim(),
			operation: operation,
			result: result,
			timestamp: new Date().valueOf(),
			new: true,
		};
		createInstance(instance);
		router.push('/dashboard');
	}

	return (
		<CommonPage
			title={'Editor'}
			description={'Enter data in ADJUST format.'}
		>
			<SimpleGrid
				minChildWidth="md"
				spacing={4}
			>
				<VStack align={'start'}>
					<Box
						bgColor={bgColor}
						borderRadius={'base'}
						width={'100%'}
					>
						<Editor
							onValueChange={code => {
								setCode(code);
								setIsCodeGood(false);
							}}
							value={code}
							highlight={code => code}
							padding={10}
							style={{
								fontFamily: '"Roboto Mono", monospace',
							}}
						/>
					</Box>
					<HStack>
						<Button
							onClick={() => {
								try {
									const parse = OperationParse[operation as OperationParsable];
									if (parse) {
										parse(code);

										toast({
											status: 'success',
											description: 'The data is well formatted.',
											title: 'Success!',
										});

										setIsCodeGood(true);
									}
								} catch (e) {
									toast({
										status: 'error',
										description: 'The data is ill-formatted.',
										title: 'Error',
									});
								}
							}}
						>
							Check data
						</Button>
						<Tooltip
							label={isCodeGood ? '' : 'Check your data before submitting.'}
						>
							<Button
								colorScheme={'blue'}
								isDisabled={!isCodeGood}
								leftIcon={waiting ? <Spinner size={'sm'} /> : <CheckIcon />}
								onClick={submit}
							>
								Submit
							</Button>
						</Tooltip>
					</HStack>
				</VStack>
				<GhilaniDocs
					docs={OperationDocs[operation as OperationParsable]}
					operation={operation}
				/>
			</SimpleGrid>
		</CommonPage>
	);
}
