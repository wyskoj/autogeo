import {
	Badge,
	Box,
	Button,
	Collapse,
	Heading,
	HStack,
	Icon,
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
	useDisclosure,
	useToast,
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
import {
	categoryByOperation,
	operationInfo,
	operationName,
	operations,
} from '../types/operation';
import DataDisplayTable from '../components/data-display-table';
import {
	DifferentialLevelingObservationResidualSchema,
	DifferentialLevelingObservationSchema,
	StationElevationSchema,
} from '../types/operation/least-squares/differential-leveling';
import {
	InterpretRefStdDev,
	InterpretRefStdDevSymbol,
} from '../comps/operations/least-squares/differential-leveling';
import useTodo from '../utils/todo';
import OperationDisplay from '../components/display/operation-display';

export default function Dashboard() {
	const [instances, setInstances] = useLocalStorage<OperationInstance[]>(
		'instances',
		z.array(OperationInstanceSchema)
	);
	// boolean states for each row
	const [showDetails, setShowDetails] = useState<boolean[]>([]);
	const toast = useToast();

	console.log(instances);

	return (
		<CommonPage
			title={'🛠️ All operations'}
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
								<OperationDisplay
									key={i}
									instance={instance}
									onDelete={() => {
										setInstances(instances.filter((_, j) => j !== i));
										toast({
											title: 'Operation deleted.',
											description: `"${instance.name}" has been deleted.`,
											status: 'info',
											duration: 5000,
											isClosable: true,
										});
									}}
									onOpen={() => {
										// set the "new" field to false
										setInstances(
											instances.map((inst, j) => {
												if (j === i) {
													return {
														...inst,
														new: false,
													};
												} else {
													return inst;
												}
											})
										);
									}}
								/>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</CommonPage>
	);
}
