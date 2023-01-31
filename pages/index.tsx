import {
	Button,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tooltip,
	Tr,
} from '@chakra-ui/react';
import ToggleIconButton from '../components/toggle-icon-button';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
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
import {
	operationCategories,
	OperationCategory,
} from '../types/operation-category';
import { Operation, operations } from '../types/operation';

export default function Home() {
	const [instances] = useLocalStorage<OperationInstance[]>(
		'instances',
		z.array(OperationInstanceSchema)
	);
	// boolean states for each row
	const [showDetails, setShowDetails] = useState<boolean[]>([]);

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
								<Tr key={instance.id}>
									<Td>
										{
											// find the operation category that contains the operation, and get its name
											(() => {
												const keys = Object.keys(operations);
												let category = keys.find(key => {
													const category = operations[key as OperationCategory];
													const operation = category.find(
														operation => operation.id === instance.operation
													);
													if (operation) {
														return operation.name;
													}
												});
											})()
										}
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
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</CommonPage>
	);
}
