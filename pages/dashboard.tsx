import {
	Badge,
	Box,
	Button,
	Collapse,
	Heading,
	HStack,
	StackDivider,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tooltip,
	Tr,
	VStack,
} from '@chakra-ui/react';
import ToggleIconButton from '../components/toggle-icon-button';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import { useState } from 'react';
import {
	AddIcon,
	ChevronRightIcon,
	DeleteIcon,
	DownloadIcon,
	EditIcon,
} from '@chakra-ui/icons';
import Link from 'next/link';
import CommonPage from '../components/common-page';
import useLocalStorage from '../hooks/use-local-storage';
import {
	OperationInstance,
	OperationInstanceSchema,
} from '../types/operation-instance';
import { z } from 'zod';
import timestampFormat from '../utils/date';
import { timeAgo } from './_app';
import { operationCategories } from '../types/operation-category';
import { categoryByOperation, operationName } from '../types/operation';
import DataDisplayTable from '../components/data-display-table';
import {
	DifferentialLevelingObservationResidualSchema,
	DifferentialLevelingObservationSchema,
	StationElevationSchema,
} from '../types/operation/least-squares/differential-leveling';
import { InterpretRefStdDev } from '../comps/operations/least-squares/differential-leveling';
import useTodo from '../utils/todo';

export default function Dashboard() {
	const [instances] = useLocalStorage<OperationInstance[]>(
		'instances',
		z.array(OperationInstanceSchema)
	);
	// boolean states for each row
	const [showDetails, setShowDetails] = useState<boolean[]>([]);
	const todo = useTodo();

	return (
		<CommonPage
			title={'All operations'}
			description={'View, edit, and export all previously executed operations.'}
			action={
				<Link href={'/operations'}>
					<Button leftIcon={<AddIcon />}>Start new operation</Button>
				</Link>
			}
		>
			<TableContainer>
				<Table variant="simple">
					{!instances || instances?.length === 0 ? (
						<TableCaption>No operations yet. ☹️ Go start one!</TableCaption>
					) : (
						<></>
					)}
					<Thead>
						<Tr>
							<Th>Operation</Th>
							<Th>Name</Th>
							<Th>Date created</Th>
							<Th>Details</Th>
						</Tr>
					</Thead>
					<Tbody>
						{instances?.map((instance, i) => {
							return (
								<>
									<Tr key={instance.id}>
										<Td>
											{
												operationCategories[
													categoryByOperation(instance.operation)!!
												].name
											}
											<ChevronRightIcon />
											{operationName(instance.operation)}
										</Td>
										<Td>{instance.name}</Td>

										<Td>
											<Tooltip
												label={timeAgo.format(new Date(instance.timestamp))}
											>
												{timestampFormat(instance.timestamp)}
											</Tooltip>
										</Td>

										<Td>
											<ToggleIconButton
												iconFalse={<MdInfoOutline fontSize={20} />}
												iconTrue={<MdInfo fontSize={20} />}
												ariaLabel={'Show details'}
												value={showDetails[i]}
												onClick={() => {
													setShowDetails(prev => {
														const newShowDetails = [...prev];
														newShowDetails[i] = !newShowDetails[i];
														return newShowDetails;
													});
												}}
											/>
										</Td>
									</Tr>
									<Tr>
										<Td
											colSpan={4}
											width={'100%'}
											border={showDetails[i] ? '' : 'none'}
											p={showDetails[i] ? 4 : 0}
											transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
										>
											<Collapse in={showDetails[i]}>
												<VStack
													divider={<StackDivider />}
													spacing={4}
												>
													<HStack
														divider={<StackDivider />}
														spacing={4}
														align={'start'}
														width={'100%'}
													>
														<VStack
															flex="1"
															spacing={4}
														>
															<Heading
																as="h4"
																size="md"
															>
																Data
															</Heading>
															<VStack
																width={'100%'}
																align={'start'}
																spacing={1}
															>
																<Heading
																	as="h5"
																	size="sm"
																>
																	Weighting scheme
																</Heading>
																<Text fontSize="md">
																	<Badge>{instance.data.weightingScheme}</Badge>
																</Text>
															</VStack>
															<Box width={'100%'}>
																<Heading
																	as="h5"
																	size="sm"
																>
																	Benchmarks
																</Heading>
																<DataDisplayTable
																	rows={instance.data.benchmarks}
																	schema={StationElevationSchema}
																/>
															</Box>
															<Box width={'100%'}>
																<Heading
																	as="h5"
																	size="sm"
																>
																	Observations
																</Heading>
																<DataDisplayTable
																	rows={instance.data.observations}
																	schema={DifferentialLevelingObservationSchema}
																	customNames={{
																		from: 'From',
																		to: 'To',
																		deltaElevation: 'Δ Elevation',
																		weight: 'Weight',
																	}}
																/>
															</Box>
														</VStack>
														<VStack
															flex="1"
															spacing={4}
														>
															<Heading
																as="h4"
																size="md"
															>
																Results
															</Heading>
															<Box width={'100%'}>
																<Heading
																	as="h5"
																	size="sm"
																>
																	Adjusted elevations
																</Heading>
																<DataDisplayTable
																	rows={instance.result.adjustedStations}
																	schema={StationElevationSchema}
																/>
															</Box>
															<Box width={'100%'}>
																<Heading
																	as="h5"
																	size="sm"
																>
																	Residuals
																</Heading>
																<DataDisplayTable
																	rows={instance.result.residuals}
																	schema={
																		DifferentialLevelingObservationResidualSchema
																	}
																/>
															</Box>
															<VStack
																width={'100%'}
																align={'start'}
																spacing={1}
															>
																<Heading
																	as="h5"
																	size="sm"
																>
																	Reference standard deviation
																</Heading>
																<Text fontSize="md">
																	<Badge
																		colorScheme={InterpretRefStdDev(
																			instance.result.referenceStdDev
																		)}
																	>
																		{Number(
																			instance.result.referenceStdDev
																		).toFixed(3)}
																	</Badge>
																</Text>
															</VStack>
														</VStack>
													</HStack>
													<HStack spacing={4}>
														<Button
															leftIcon={<EditIcon />}
															onClick={todo}
														>
															Edit
														</Button>
														<Button
															leftIcon={<DownloadIcon />}
															onClick={todo}
														>
															Export
														</Button>
														<Button
															leftIcon={<DeleteIcon />}
															colorScheme={'red'}
															onClick={todo}
														>
															Delete
														</Button>
													</HStack>
												</VStack>
											</Collapse>
										</Td>
									</Tr>
								</>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</CommonPage>
	);
}
