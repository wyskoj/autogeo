import CommonPage from '../components/common-page';
import {
	Box,
	Button,
	Center,
	Divider,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Spinner,
	Text,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useAuthenticatedRoute, useDefaultAuthState } from '../hooks/firebase';
import { Field, Form, Formik } from 'formik';
import { CheckIcon } from '@chakra-ui/icons';
import { useSettings } from '../hooks/use-settings';

export default function Settings() {
	useAuthenticatedRoute();
	const { loading } = useDefaultAuthState();
	const { settings, updateSettings } = useSettings();
	const toast = useToast();

	return (
		<CommonPage
			title={'⚙️ Settings'}
			description={'Configure settings for your account.'}
		>
			{loading || settings === undefined ? (
				<Center>
					<Spinner size="xl" />
				</Center>
			) : (
				<Formik
					initialValues={settings}
					onSubmit={(values, actions) => {
						updateSettings(values)
							.then(() => {
								toast({
									title: 'Settings saved.',
									status: 'success',
									duration: 3000,
									isClosable: true,
								});
							})
							.catch(err => {
								toast({
									title: 'Error saving settings.',
									status: 'error',
									duration: 3000,
									isClosable: true,
								});
								console.error(err);
							})
							.finally(() => {
								actions.setSubmitting(false);
							});
					}}
				>
					{props => (
						<Form>
							<VStack align={'start'}>
								<Box>
									<Heading
										size="md"
										textTransform="uppercase"
									>
										Decimal places
									</Heading>
									<Text>
										You can configure the number of decimal places to display in
										your calculations, for each type of value.
									</Text>
								</Box>
								<HStack>
									<Field name="distanceDecimalPlaces">
										{({ field, form }: any) => {
											return (
												<FormControl
													isInvalid={form.errors.name && form.touched.name}
												>
													<FormLabel>Distances</FormLabel>
													<Input
														{...field}
														type={'number'}
														required={true}
													></Input>
													<FormErrorMessage>
														{form.errors.name}
													</FormErrorMessage>
												</FormControl>
											);
										}}
									</Field>
									<Field name="angleDecimalPlaces">
										{({ field, form }: any) => (
											<FormControl
												isInvalid={form.errors.name && form.touched.name}
											>
												<FormLabel>Angles</FormLabel>
												<Input
													{...field}
													type={'number'}
													required={true}
												></Input>
												<FormErrorMessage>{form.errors.name}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="coordinateDecimalPlaces">
										{({ field, form }: any) => (
											<FormControl
												isInvalid={form.errors.name && form.touched.name}
											>
												<FormLabel>Coordinates</FormLabel>
												<Input
													{...field}
													type={'number'}
													required={true}
												></Input>
												<FormErrorMessage>{form.errors.name}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="latLonDecimalPlaces">
										{({ field, form }: any) => (
											<FormControl
												isInvalid={form.errors.name && form.touched.name}
											>
												<FormLabel>Latitude/Longitude</FormLabel>
												<Input
													{...field}
													type={'number'}
													required={true}
												></Input>
												<FormErrorMessage>{form.errors.name}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="scaleFactorDecimalPlaces">
										{({ field, form }: any) => (
											<FormControl
												isInvalid={form.errors.name && form.touched.name}
											>
												<FormLabel>Scale Factors</FormLabel>
												<Input
													{...field}
													type={'number'}
													required={true}
												></Input>
												<FormErrorMessage>{form.errors.name}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</HStack>
								<Divider />
								<Button
									type={'submit'}
									colorScheme={'blue'}
									isLoading={props.isSubmitting}
									leftIcon={<CheckIcon />}
								>
									Save
								</Button>
							</VStack>
						</Form>
					)}
				</Formik>
			)}
		</CommonPage>
	);
}
