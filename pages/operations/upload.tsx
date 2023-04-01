import CommonPage from '../../components/common-page';
import {
	Badge,
	Box,
	Button,
	Card,
	Tag,
	TagLabel,
	Text,
	VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { MdFileUpload } from 'react-icons/md';
import { GetServerSidePropsContext } from 'next';
import { PreloadOperationProps } from '../../types/operation/preload-props';
import {
	OperationComp, OperationName,
	OperationParsable,
	OperationParsableSchema,
	OperationParse
} from '../../operation/operation';
import { AnimatePresence, motion } from 'framer-motion';
import router from 'next/router';
import { v4 as uuid } from 'uuid';
import { useOperationInstances } from '../../hooks/operation-instances';
import { OperationInstance, OperationResult } from '../../operation/operation-instance';

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

export default function Upload(props: PreloadOperationProps) {
	const [file, setFile] = useState<File | null>(null);
	const [dragging, setDragging] = useState(0);
	const { createInstance } = useOperationInstances();

	let operation: OperationParsable;
	try {
		operation = OperationParsableSchema.parse(props.operation);
	} catch (e) {
		router.push('/operations');
		return;
	}

	function handleUpload() {
		// Get parser and operator
		const parser = OperationParse[operation];
		const comp = OperationComp[operation];

		// Read contents of file
		let reader = new FileReader();
		reader.readAsText(file!!);
		reader.onload = () => {
			try {
				// Parse contents
				let parse = parser(reader.result as string);

				// Operate on contents
				let operate = comp(parse.data) as OperationResult;

				const instance: OperationInstance = {
					data: parse.data,
					id: uuid(),
					name: parse.title.trim(),
					operation: operation,
					result: operate,
					timestamp: new Date().valueOf(),
					new: true,
				};
				createInstance(instance);
				router.push('/dashboard');
			} catch (e) {
				console.error(e);
			}
		};
	}

	return (
		<CommonPage
			title={'Upload ADJUST file'}
			description={'Upload and convert your ADJUST file to be used in AutoGeo.'}
		>
			<VStack spacing={4}>
				<Text>
					You are uploading a{' '}
					<Badge colorScheme={'purple'}>
						{OperationName[operation]}
					</Badge>{' '}
					file.
				</Text>
				<Card
					w={'sm'}
					onDrop={ev => {
						ev.preventDefault();
						setFile(ev.dataTransfer.files[0]);
						setDragging(0);
					}}
					onDragEnter={ev => {
						ev.preventDefault();
						setDragging(dragging + 1);
					}}
					onDragLeave={ev => {
						ev.preventDefault();
						setDragging(dragging - 1);
					}}
					style={{ transform: dragging ? 'scale(1.05)' : 'scale(1)' }}
				>
					<FileUploader
						handleChange={(file: File) => {
							setFile(file);
							console.log(file);
						}}
						onSelect={(file: File) => {
							setFile(file);
							console.log(file);
						}}
						name={'file'}
						types={['ADAT']}
						multiple={false}
						label={' '}
						hoverTitle={' '}
					>
						<VStack
							spacing={0}
							p={4}
							_hover={{
								cursor: 'pointer',
							}}
						>
							<MdFileUpload size={48} />
							<Text>Click to browse or drag and drop</Text>
							<Text
								color={'gray.500'}
								fontSize={'sm'}
							>
								ADAT files only
							</Text>
						</VStack>
					</FileUploader>
				</Card>
				<Box height={'2rem'}>
					<AnimatePresence>
						{file && (
							<motion.div
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.2, ease: 'easeInOut' }}
							>
								<Tag
									size={'md'}
									variant="subtle"
									colorScheme="brand"
									py={2}
									px={4}
								>
									<TagLabel>{file?.name}</TagLabel>
								</Tag>
							</motion.div>
						)}
					</AnimatePresence>
				</Box>
				<Button
					isDisabled={file === null}
					onClick={handleUpload}
				>
					Submit
				</Button>
			</VStack>
		</CommonPage>
	);
}
