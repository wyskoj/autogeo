import {
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
	useToast,
} from '@chakra-ui/react';
import { OperationDisplayRow } from './operation-display';
import { OperationInstance } from '../../types/operation-instance';

/**
 * Displays the main dashboard by using a table format. This is shown at breakpoints
 * of 'lg' and above. At smaller breakpoints, the dashboard is displayed using `DashboardByCards`.
 *
 * @param props.instances The list of operation instances to display.
 * @param props.setInstances A function to set the list of operation instances.
 */
export default function DashboardByTable(props: {
	instances: OperationInstance[];
	setInstances: (instances: OperationInstance[]) => void;
}) {
	const toast = useToast();

	function deleteInstance(instance: OperationInstance, index: number) {
		if (!props.instances) return;
		props.setInstances(props.instances.filter((_, j) => j !== index));
		toast({
			title: 'Operation deleted.',
			description: `"${instance.name}" has been deleted.`,
			status: 'info',
			duration: 5000,
			isClosable: true,
		});
	}

	function changeInstanceNew(index: number) {
		if (!props.instances) return;
		props.setInstances(
			props.instances.map((inst, j) => {
				if (j === index) {
					return {
						...inst,
						new: false,
					};
				} else {
					return inst;
				}
			})
		);
	}

	return (
		<TableContainer>
			<Table variant="simple">
				{!props.instances || props.instances?.length === 0 ? (
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
					{props.instances?.map((instance, i) => {
						return (
							<OperationDisplayRow
								key={i}
								instance={instance}
								onDelete={() => deleteInstance(instance, i)}
								onOpen={() => changeInstanceNew(i)}
							/>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
