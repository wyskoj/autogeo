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
import { OperationInstance } from '../../types/operation-instance';
import { v4 as uuid } from 'uuid';
import { CheckIcon } from '@chakra-ui/icons';
import { useOperationInstances } from '../../hooks/operation-instances';
import { GetServerSidePropsContext } from 'next';
import { PreloadOperationProps } from '../../types/operation/preload-props';
import { OperationDocs, OperationSchema } from '../../types/operation';
import { CGDocsRender } from '../../cg-docs/docs-common';
import { operationInfo } from '../../utils/operation';

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

	const info = operationInfo(operationParse.data);

	function submit() {
		if (!operationParse.success) return;
		setWaiting(true);
		let parse = info.parse!!;
		let operate = info.operate!!;
		const { name, data } = parse(code);
		const results = operate(data);
		const instance: OperationInstance = {
			data,
			id: uuid(),
			name: name.trim(),
			operation: operationParse.data,
			result: results,
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
									const parse = info.parse;
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
				<CGDocsRender
					docs={OperationDocs[operationParse.data]!!}
					operation={operationParse.data}
				/>
			</SimpleGrid>
		</CommonPage>
	);
}
