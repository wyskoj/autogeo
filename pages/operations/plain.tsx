import CommonPage from '../../components/common-page';
import Editor from 'react-simple-code-editor';
import { useState } from 'react';
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	Spinner,
	Tooltip,
	useColorModeValue,
	useToast,
	VStack,
} from '@chakra-ui/react';
import router, { useRouter } from 'next/router';
import DifferentialLevelingDocs from '../../cg-docs/least-squares/differential-leveling';
import ParseDifferentialLeveling from '../../cg-parse/least-squares/differential-leveling';
import AdjustDifferentialLeveling from '../../comps/operations/least-squares/differential-leveling';
import {
	OperationInstance,
	OperationInstanceSchema,
} from '../../types/operation-instance';
import { v4 as uuid } from 'uuid';
import { CheckIcon } from '@chakra-ui/icons';
import useLocalStorage from '../../hooks/use-local-storage';
import { z } from 'zod';

export default function PlainEditor() {
	const [code, setCode] = useState('');
	const [isCodeGood, setIsCodeGood] = useState(false);
	const toast = useToast();
	const router = useRouter();
	const [waiting, setWaiting] = useState(false);
	const [instances, setInstances] = useLocalStorage<OperationInstance[]>(
		'instances',
		z.array(OperationInstanceSchema)
	);

	function submit() {
		setWaiting(true);
		const { name, data } = ParseDifferentialLeveling(code);
		const results = AdjustDifferentialLeveling(data);
		const instance: OperationInstance = {
			data,
			id: uuid(),
			name: name.trim(),
			operation: 'differential-leveling',
			result: results,
			timestamp: new Date().valueOf(),
			new: true,
		};
		setInstances([...(instances ?? []), instance]);
		router.push('/dashboard');
	}

	return (
		<CommonPage
			title={'Editor'}
			description={'Enter data in ADJUST format.'}
		>
			<SimpleGrid
				minChildWidth="250px"
				spacing={4}
			>
				<VStack align={'start'}>
					<Box
						bgColor={useColorModeValue('gray.100', 'gray.700')}
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
						/>
					</Box>
					<HStack>
						<Button
							onClick={() => {
								try {
									ParseDifferentialLeveling(code);

									toast({
										status: 'success',
										description: 'The data is well formatted.',
										title: 'Success!',
									});

									setIsCodeGood(true);
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
				<Box>
					<Heading
						as="h4"
						size="md"
					>
						Differential Leveling
					</Heading>
					<DifferentialLevelingDocs />
				</Box>
			</SimpleGrid>
		</CommonPage>
	);
}
