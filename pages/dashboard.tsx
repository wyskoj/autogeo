import { Button, Center, Show, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import CommonPage from '../components/common-page';
import useLocalStorage from '../hooks/use-local-storage';
import {
	OperationInstance,
	OperationInstanceSchema,
} from '../types/operation-instance';
import { z } from 'zod';
import DashboardByTable from '../components/dashboard/dashboard-table';
import DashboardByCards from '../components/dashboard/dashboard-cards';

export default function Dashboard() {
	const [instances, setInstances] = useLocalStorage<OperationInstance[]>(
		'instances',
		z.array(OperationInstanceSchema)
	);

	function display() {
		if (instances === undefined) {
			return (
				<Center>
					<Text>Loading...</Text>
				</Center>
			);
		} else if (instances === null || instances?.length === 0) {
			return (
				<Center>
					<Text>No operations yet. ☹️ Go start one!</Text>
				</Center>
			);
		} else {
			return (
				<>
					<Show above={'lg'}>
						<DashboardByTable
							instances={instances}
							setInstances={setInstances}
						/>
					</Show>
					<Show below={'lg'}>
						<DashboardByCards
							instances={instances}
							setInstances={setInstances}
						/>
					</Show>
				</>
			);
		}
	}

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
			{display()}
		</CommonPage>
	);
}
