import { ZodNumber, ZodObject, ZodString } from 'zod';
import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	VStack,
} from '@chakra-ui/react';

export default function DataDisplayTable<
	T extends { [key: string]: string | number }
>(props: {
	rows: T[];
	customNames?: { [key in keyof T]: string };
	schema: ZodObject<{ [key: string]: ZodString | ZodNumber }>;
	hideFields?: (keyof T)[];
}) {
	// get keys of schema
	const keys = Object.keys(props.schema.shape) as (keyof T['shape'])[];
	// get types of schema
	const types = Object.values(props.schema.shape);

	return (
		<VStack
			spacing={4}
			width={'100%'}
		>
			<TableContainer width={'100%'}>
				<Table
					variant="simple"
					size={'sm'}
				>
					<Thead>
						<Tr>
							{keys.map((key, index) => {
								if (props.hideFields?.includes(key as keyof T)) {
									return null;
								}
								return (
									<Th
										key={index}
										isNumeric={types[index].constructor === ZodNumber}
									>
										{props.customNames
											? props.customNames[key as keyof T]
											: (key as string)}
									</Th>
								);
							})}
						</Tr>
					</Thead>
					<Tbody>
						{props.rows.map((it, i) => {
							return (
								<Tr key={i}>
									{keys.map((key, j) => {
										if (props.hideFields?.includes(key as keyof T)) {
											return null;
										}
										if (types[j].constructor === ZodNumber) {
											return (
												<Td
													key={j}
													isNumeric={true}
												>
													{Number(it[key as keyof T]).toFixed(3)}
												</Td>
											);
										} else {
											return <Td key={j}>{it[key as keyof T]}</Td>;
										}
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>
		</VStack>
	);
}
