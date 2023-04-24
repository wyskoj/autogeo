import {
	OperationData,
	OperationInstance,
	OperationResult,
} from '../operation/operation-instance';
import { z, ZodObject, ZodOptional } from 'zod';
import { Operation } from '../operation/operation';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
	Badge,
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useOperationInstances } from '../hooks/use-operation-instances';
import { removeNaN } from '../utils/remove-nan';
import { BuildInstance } from '../utils/operation-instance';
import router from 'next/router';
import { EllipsoidNameSchema } from '../operation/misc/ellipsoid/ellipsoid-types';
import {
	DMSInput,
	DMSSchema,
	EllipsoidInput, LatitudeInput,
	LatitudeSchema, LongitudeInput,
	LongitudeSchema,
	SpcsZoneInput, XYInput, XYSchema
} from './form-components';
import capitalize from '../utils/capitalize';
import { CheckIcon } from '@chakra-ui/icons';
import { SpcsZoneSchema } from '../operation/misc/spcs/spcs-zones';

export function FormFactory<
	D extends OperationData,
	R extends OperationResult
>(props: {
	schema: ZodObject<any>;
	isTempAble: boolean;
	captions: { [key: string]: string };
	transform: (values: any) => D;
	reverseTransform: (instance: OperationInstance) => any;
	comp: (data: D) => R;
	display: (props: { result: R; data: D }) => JSX.Element;
	operation: Operation;
	edit: string | null;
	dmsExtensions?: { [key: string]: string };
}) {
	type schemaType = z.infer<typeof props.schema>;
	const methods = useForm<schemaType>();
	const toast = useToast();

	const [tempData, setTempData] = useState<D | null>(null);
	const [tempResult, setTempResult] = useState<R | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { createInstance, operationInstances, updateInstance } =
		useOperationInstances();

	useEffect(() => {
		if (props.edit && operationInstances) {
			const instance = operationInstances.find(
				instance => instance.id === props.edit
			);
			if (instance) {
				let reverseTransform = props.reverseTransform(instance);
				methods.reset(removeNaN(reverseTransform));
			}
		}
	}, [methods, operationInstances, props, props.edit]);

	const onSubmit: SubmitHandler<schemaType> = data => {
		const opData = props.transform(data);
		console.log(opData);
		try {
			const result = props.comp(opData);

			if ((data.title ?? '').trim() === '') {
				setTempData(opData);
				setTempResult(result);
				onOpen();
			} else {
				if (props.edit !== null) {
					updateInstance(
						props.edit,
						BuildInstance(
							props.operation,
							data.title.trim(),
							opData,
							result,
							props.edit
						)
					);
				} else {
					createInstance(
						BuildInstance(props.operation, data.title.trim(), opData, result)
					);
				}

				router.push('/dashboard');
			}
		} catch (e) {
			toast({
				title: 'Error',
				description: 'An error occurred while performing the operation.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};
	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size={'xl'}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Operation Results</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<props.display
							data={tempData!!}
							result={tempResult!!}
						/>
					</ModalBody>
					<ModalFooter>
						<Text fontSize="sm">
							This is a temporary operation. To save it to your list of
							operations, enter a title before submitting.
						</Text>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<VStack
					align={'start'}
					spacing={4}
				>
					{Object.entries(props.schema.shape).map(([key, value], index) => {
						let schema: unknown;
						let optional = false;
						if (value instanceof ZodOptional) {
							schema = value.unwrap();
							optional = true;
						} else {
							schema = value;
						}

						function component() {
							if (schema === EllipsoidNameSchema) {
								return (
									<EllipsoidInput
										name={key}
										methods={methods}
										caption={props.captions[key]}
									/>
								);
							} else if (schema === DMSSchema) {
								return (
									<DMSInput
										name={key}
										methods={methods}
										optional={optional}
										caption={props.captions[key]}
										extension={props.dmsExtensions?.[key]}
									/>
								);
							} else if (schema === SpcsZoneSchema) {
								return (
									<SpcsZoneInput
										name={key}
										methods={methods}
										caption={props.captions[key]}
									/>
								);
							} else if (schema === XYSchema) {
								return (
									<XYInput
										name={key}
										methods={methods}
										caption={props.captions[key]}
									/>
								);
								return (
									<SpcsZoneInput
										name={key}
										methods={methods}
										caption={props.captions[key]}
									/>
								);
							} else if (schema === LatitudeSchema) {
								return <LatitudeInput
									name={key}
									methods={methods}
									optional={optional}
									caption={props.captions[key]}
								/>
							} else if (schema === LongitudeSchema) {
								return <LongitudeInput
									name={key}
									methods={methods}
									optional={optional}
									caption={props.captions[key]}
								/>
							} else {
								return (
									<FormControl
										isInvalid={methods.formState.errors[key] !== undefined}
									>
										<Input
											{...methods.register(key, {
												required: key === 'title' ? !props.isTempAble : true,
											})}
										/>
										<FormHelperText>
											{key === 'title'
												? props.isTempAble
													? 'Use a name that uniquely identifies this operation. If you would like to make this a temporary operation (the results are not saved), you can leave this field blank.'
													: 'Use a name that uniquely identifies this operation.'
												: props.captions[key]}
										</FormHelperText>
										<FormErrorMessage>
											{methods.formState.errors[key]?.message as string}
										</FormErrorMessage>
									</FormControl>
								);
							}
						}

						return (
							<Box key={key}>
								<FormLabel>
									<Badge mr={2}>{index + 1}</Badge>
									{capitalize(key)}
									{optional ? (
										<Badge
											colorScheme={'purple'}
											mx={2}
										>
											Optional
										</Badge>
									) : null}
								</FormLabel>
								{component()}
							</Box>
						);
					})}
					<Button
						type={'submit'}
						leftIcon={<CheckIcon />}
					>
						Submit
					</Button>
				</VStack>
			</form>
		</>
	);
}
