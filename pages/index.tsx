import {
	Button,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import ToggleIconButton from '../components/toggle-icon-button';
import { MdInfo, MdInfoOutline } from 'react-icons/md';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import CommonPage from '../components/common-page';

export default function Home() {
	const [value, setValue] = useState(false);

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
						<Tr>
							<Td>Least-squares / Differential Leveling</Td>
							<Td>Ghilani 12.2</Td>
							<Td>01/29/2022 11:05 AM</Td>
							<Td>
								<ToggleIconButton
									iconFalse={<MdInfoOutline fontSize={20} />}
									iconTrue={<MdInfo fontSize={20} />}
									ariaLabel={'Show details'}
									value={value}
									onClick={e => {
										setValue(!value);
									}}
								/>
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</CommonPage>
	);
}
