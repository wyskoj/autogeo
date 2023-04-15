import { Controller, UseFormReturn } from 'react-hook-form';
import {
	Center,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	HStack,
	Input,
	Select,
	Text
} from '@chakra-ui/react';
import { z } from 'zod';
import { SpcsZone, SpcsZoneSchema } from '../operation/misc/spcs/spcs-zones';

export const DMSSchema = z.object({
	degrees: z.number().int().min(0).max(359),
	minutes: z.number().int().min(0).max(59),
	seconds: z.number().min(0).max(60),
});

export function DMSInput(props: {
	name: string;
	methods: UseFormReturn<any>;
	optional?: boolean;
	caption: string;
	extension?: string;
}) {
	return (
		<FormControl
			isInvalid={props.methods.formState.errors[props.name] !== undefined}
		>
			<HStack
				align={'left'}
				w={'24rem'}
			>
				<Input
					{...props.methods.register(`${props.name}.degrees`, {
						required: !props.optional ?? true,
						min: {
							value: 0,
							message: 'Degrees must be greater than 0',
						},
						max: {
							value: 359,
							message: 'Degrees must be less than 359',
						},
						valueAsNumber: true,
					})}
				/>
				<Text>&deg;</Text>
				<Input
					{...props.methods.register(`${props.name}.minutes`, {
						required: !props.optional ?? true,
						min: {
							value: 0,
							message: 'Minutes must be greater than 0',
						},
						max: {
							value: 59,
							message: 'Minutes must be less than 60',
						},
						valueAsNumber: true,
					})}
				/>
				<Text>&apos;</Text>
				<Input
					{...props.methods.register(`${props.name}.seconds`, {
						required: !props.optional ?? true,
						min: {
							value: 0,
							message: 'Seconds must be greater than 0',
						},
						max: {
							value: 60,
							message: 'Seconds must be less than 60',
						},
						valueAsNumber: true,
					})}
					onReset={() => {
						console.log('reset');
					}}
				/>
				<Text>&quot;</Text>
				<Center>

					<Text>{props.extension}</Text>
				</Center>
			</HStack>
			<FormHelperText>{props.caption}</FormHelperText>
		</FormControl>
	);
}

export function EllipsoidInput(props: {
	name: string;
	methods: UseFormReturn<any>;
	caption: string;
}) {
	return (
		<Controller
			name={props.name}
			control={props.methods.control}
			defaultValue=""
			render={({ field }) => (
				<FormControl
					isInvalid={props.methods.formState.errors[props.name] !== undefined}
				>
					<Select
						{...field}
						placeholder={'Select an ellipsoid'}
					>
						<option value="GRS80">GRS80</option>
						<option value="WGS84">WGS84</option>
					</Select>
					<FormHelperText>{props.caption}</FormHelperText>
					<FormErrorMessage>
						{props.methods.formState.errors?.[props.name]?.message as string}
					</FormErrorMessage>
				</FormControl>
			)}
			rules={{
				required: "Ellipsoid is required.",
			}}
		/>
	);
}

export function SpcsZoneInput(props: {
	name: string;
	methods: UseFormReturn<any>;
	caption: string;
}) {
	return (
		<Controller
			name={props.name}
			control={props.methods.control}
			defaultValue=""
			render={({ field }) => (
				<FormControl
					isInvalid={props.methods.formState.errors[props.name] !== undefined}
				>
					<Select
						{...field}
						placeholder={'Select a zone'}
					>
						{SpcsZoneSchema.options.map((key) => (
							<option value={key} key={key}>{key}</option>
						))}
					</Select>
					<FormHelperText>{props.caption}</FormHelperText>
					<FormErrorMessage>
						{props.methods.formState.errors?.[props.name]?.message as string}
					</FormErrorMessage>
				</FormControl>
			)}
			rules={{
				required: "Ellipsoid is required.",
			}}
		/>
	);
}
