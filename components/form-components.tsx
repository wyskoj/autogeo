import { Controller, UseFormReturn } from 'react-hook-form';
import {
	Center,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	HStack,
	Input, Radio, RadioGroup,
	Select, Stack,
	Text
} from '@chakra-ui/react';
import { z } from 'zod';

export const XYSchema = z.object({
	x: z.number(),
	y: z.number(),
})

export function XYInput(props:{
	name: string;
	methods: UseFormReturn<any>;
	optional?: boolean;
	caption: string;
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
					{...props.methods.register(`${props.name}.x`, {
						required: !props.optional ?? true,
						valueAsNumber: true,
					})}
					placeholder={"X (Easting)"}
				/>
				<Input
					{...props.methods.register(`${props.name}.y`, {
						required: !props.optional ?? true,
						valueAsNumber: true,
					})}
					placeholder={"Y (Northing)"}
				/>
			</HStack>
			<FormHelperText>{props.caption}</FormHelperText>
			<FormErrorMessage>
				{props.methods.formState.errors[props.name]?.message as string}
			</FormErrorMessage>
		</FormControl>
	);
}
import { SpcsZoneSchema } from '../operation/misc/spcs/spcs-zones';

export const DMSSchema = z.object({
	degrees: z.number().int().min(0).max(359),
	minutes: z.number().int().min(0).max(59),
	seconds: z.number().min(0).max(60),
});

export const LatitudeSchema = z.object({
	degrees: z.number().int().min(0).max(359),
	minutes: z.number().int().min(0).max(59),
	seconds: z.number().min(0).max(60),
	hemisphere: z.enum(['N', 'S']),
});

export const LongitudeSchema = z.object({
	degrees: z.number().int().min(0).max(359),
	minutes: z.number().int().min(0).max(59),
	seconds: z.number().min(0).max(60),
	hemisphere: z.enum(['W', 'E']),
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
					{...props.methods.register(`${props.name}.d`, {
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
					{...props.methods.register(`${props.name}.m`, {
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
					{...props.methods.register(`${props.name}.s`, {
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

export function LatitudeInput(props: {
	name: string;
	methods: UseFormReturn<any>;
	optional?: boolean;
	caption: string;
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
					{...props.methods.register(`${props.name}.d`, {
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
					{...props.methods.register(`${props.name}.m`, {
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
					{...props.methods.register(`${props.name}.s`, {
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
				<Controller
					name={`${props.name}.hemisphere`}
					control={props.methods.control}
					defaultValue=""
					rules={{ required: !props.optional }}
					render={({ field }) => (
						<RadioGroup {...field} defaultValue="">
							<Stack direction={"row"}>
								<Radio value={"N"}>N</Radio>
								<Radio value={"S"}>S</Radio>
							</Stack>
						</RadioGroup>
					)}
				/>

			</HStack>
			<FormHelperText>{props.caption}</FormHelperText>
		</FormControl>
	);
}

export function LongitudeInput(props: {
	name: string;
	methods: UseFormReturn<any>;
	optional?: boolean;
	caption: string;
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
					{...props.methods.register(`${props.name}.d`, {
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
					{...props.methods.register(`${props.name}.m`, {
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
					{...props.methods.register(`${props.name}.s`, {
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
				<RadioGroup>
					<Stack direction={'row'}>
						<Radio {...props.methods.register(`${props.name}.hemisphere`, {})} type={'radio'} value={'W'}>W</Radio>
						<Radio {...props.methods.register(`${props.name}.hemisphere`, {})} type={'radio'} value={'E'}>E</Radio>
					</Stack>
				</RadioGroup>
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
				required: 'Ellipsoid is required.',
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
						{SpcsZoneSchema.options.map(key => (
							<option
								value={key}
								key={key}
							>
								{key}
							</option>
						))}
					</Select>
					<FormHelperText>{props.caption}</FormHelperText>
					<FormErrorMessage>
						{props.methods.formState.errors?.[props.name]?.message as string}
					</FormErrorMessage>
				</FormControl>
			)}
			rules={{
				required: 'Zone is required.',
			}}
		/>
	);
}
