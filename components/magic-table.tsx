import { ZodNumber, ZodObject, ZodString } from 'zod';
import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	HStack,
	IconButton,
	Input,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	VStack,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import capitalize from '../utils/capitalize';

export default function MagicTable<
	T extends { [key: string]: string | number }
>(props: {
	customNames?: { [key in keyof T]: string };
	helperText: string;
	rows: T[];
	schema: ZodObject<{ [key: string]: ZodString | ZodNumber }>;
	setRows: Dispatch<SetStateAction<T[]>>;
	transform: { [key in keyof T]: (data: T[key]) => T[key] };
	validation: (data: T, rows: T[]) => { [key in keyof T]: string | null };
	hideFields?: (keyof T)[];
}) {
	// get keys of schema
	const keys = Object.keys(props.schema.shape) as (keyof T['shape'])[];

	// get types of schema
	const types = Object.values(props.schema.shape);

	function emptyObj() {
		let x = {} as any;
		for (let i = 0; i < keys.length; i++) {
			x[keys[i]] = null;
		}
		return x;
	}

	const [fields, setFields] = useState<{ [key in keyof T]: T[key] | null }>(
		emptyObj()
	);
	const [validationErr, setValidationErr] = useState<{
		[key in keyof T]: string | null;
	}>(emptyObj());

	const field1 = useRef<HTMLInputElement>(null);

	let add = () => {
		// construct a new object from field data
		const newObject = {} as any;
		for (let i = 0; i < keys.length; i++) {
			let isNumber = types[i].constructor === ZodNumber;

			if (props.hideFields?.includes(keys[i] as keyof T)) {
				if (isNumber) {
					newObject[keys[i]] = 0;
				} else {
					newObject[keys[i]] = '';
				}
				continue;
			}

			if (isNumber) {
				newObject[keys[i]] = Number(fields[keys[i]]); // parse if number
			} else {
				newObject[keys[i]] = fields[keys[i]];
			}
		}

		// transform data
		for (let i = 0; i < keys.length; i++) {
			if (newObject[keys[i]] !== null) {
				newObject[keys[i]] = props.transform[keys[i] as keyof T](
					newObject[keys[i]] as T[keyof T]
				);
			}
		}

		// validate data //
		let valid = true;

		/* make blank validation object */
		let newValidationErrors = {} as any;
		for (let i = 0; i < keys.length; i++) {
			newValidationErrors[keys[i]] = null;
		}

		/* check for some value */
		for (let i = 0; i < keys.length; i++) {
			if (
				fields[keys[i] as keyof T] === null &&
				!props.hideFields?.includes(keys[i] as keyof T)
			) {
				valid = false; // do not accept if any fields are null
				newValidationErrors[keys[i] as keyof T] = `${
					props.customNames
						? props.customNames[keys[i] as keyof T]
						: capitalize(keys[i] as string)
				} is required.`;
			}
		}

		/* check for custom validation */
		const customValidation = props.validation(newObject, props.rows);
		for (let i = 0; i < keys.length; i++) {
			if (customValidation[keys[i] as keyof T] !== null) {
				valid = false;
				newValidationErrors[keys[i] as keyof T] =
					customValidation[keys[i] as keyof T];
			}
		}

		setValidationErr(newValidationErrors); // apply new validation errors

		if (!valid) {
			return;
		}

		// check against zod to be extra safe
		const zodParse = props.schema.safeParse(newObject);
		if (!zodParse.success) {
			console.error(zodParse.error);
			return;
		}

		// all good to go
		props.setRows([...props.rows, newObject as T]);
		field1.current?.focus();
		setFields(emptyObj());
	};

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
					<colgroup>
						{Array.from(
							{ length: keys.length - (props.hideFields?.length ?? 0) },
							(_, i) => i
						).map((_, i) => (
							<col
								span={1}
								key={i}
							/>
						))}
						<col
							span={1}
							width={'0em'}
						/>
					</colgroup>
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
							<Th>Actions</Th>
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
										return (
											<Td
												key={j}
												isNumeric={types[j].constructor === ZodNumber}
											>
												{it[key as keyof T]}
											</Td>
										);
									})}
									<Td>
										<Center>
											<IconButton
												variant="ghost"
												colorScheme="red"
												aria-label={'Remove'}
												icon={<DeleteIcon />}
												onClick={() => {
													props.setRows(
														props.rows.filter((_, index) => index !== i)
													);
												}}
											/>
										</Center>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
				<FormHelperText>{props.helperText}</FormHelperText>
			</TableContainer>
			<HStack
				width={'100%'}
				align={'flex-start'}
			>
				{keys.map((it, i) => {
					if (props.hideFields?.includes(it as keyof T)) {
						return null;
					}
					return (
						<FormControl
							width={'fit-content'}
							key={i}
							isInvalid={validationErr[it as keyof T] !== null}
						>
							<Input
								type={types[i].constructor === ZodString ? 'text' : 'number'}
								placeholder={
									props.customNames
										? props.customNames[it as keyof T]
										: capitalize(it as string)
								}
								value={fields[it as keyof T] ?? ''}
								onChange={e => {
									let value: string | number | null =
										types[i].constructor === ZodNumber
											? Number(e.target.value)
											: e.target.value;
									if (e.target.value === '') {
										value = null;
									}
									setFields({ ...fields, [it]: value });
									setValidationErr({ ...validationErr, [it]: null });
								}}
								onKeyDown={event => {
									if (event.key === 'Enter') {
										add();
									}
								}}
								ref={i === 0 ? field1 : null}
							/>
							<FormErrorMessage>
								{validationErr[it as keyof T]}
							</FormErrorMessage>
						</FormControl>
					);
				})}
				<Button
					leftIcon={<AddIcon />}
					onClick={add}
				>
					Add
				</Button>
			</HStack>
		</VStack>
	);
}
