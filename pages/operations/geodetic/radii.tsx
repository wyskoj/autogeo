import CommonPage from '../../../components/common-page';
import useLocalStorage from '../../../hooks/use-local-storage';
import {
	OperationInstance,
	OperationInstanceSchema,
} from '../../../types/operation-instance';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import {
	Badge,
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Select,
	Spinner,
	VStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
	Box,
} from '@chakra-ui/react';
import EllipsoidSelect from '../../../components/ellipsoid-select';
import AngleInput from '../../../components/angle-input';
import { CheckIcon } from '@chakra-ui/icons';
import {
	RadiiData,
	RadiiResult,
	RadiiResultSchema,
} from '../../../types/operation/geodetic/radii';
import { Radii } from '../../../comps/operations/geodetic/radii';
import { Ellipsoids } from '../../../comps/operations/geodetic/ellipsoids';
import { EllipsoidName } from '../../../types/operation/geodetic/ellipsoid';
import RadiiDisplay from '../../../components/display/geodetic/radii';
import router from 'next/router';
import { v4 as uuid } from 'uuid';

export default function RadiiForm() {
	const [instances, setInstances] = useLocalStorage<OperationInstance[]>(
		'instances',
		z.array(OperationInstanceSchema)
	);
	const [title, setTitle] = useState('');
	const [ellipsoid, setEllipsoid] = useState('');

	useEffect(() => {
		console.log('ellipsoid', ellipsoid === '');
	}, [ellipsoid]);

	const [latitude, setLatitude] = useState(0);
	const [azimuth, setAzimuth] = useState(0);

	const [waiting, setWaiting] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [tempData, setTempData] = useState<RadiiData | null>(null);
	const [tempResult, setTempResult] = useState<RadiiResult | null>(null);

	function submit() {
		const payload: RadiiData = {
			ellipsoid: ellipsoid as EllipsoidName,
			latitude,
			azimuth,
		};
		const results = Radii(payload);
		if (title === '') {
			// Temporary operation, just display a modal with the results
			setTempData(payload);
			setTempResult(results);
			onOpen();
		} else {
			// Save to local storage
			const instance: OperationInstance = {
				data: payload,
				id: uuid(),
				name: title.trim(),
				operation: 'radii',
				result: results,
				timestamp: new Date().valueOf(),
				new: true,
			};
			setInstances([...(instances ?? []), instance]);
			router.push('/dashboard');
		}
	}

	return (
		<>
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
							<RadiiDisplay
								data={tempData!!}
								results={tempResult!!}
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
			</>
			<CommonPage
				title={'Radii'}
				description={
					'Calculates the radii of curvature of the ellipsoid at a given latitude.'
				}
			>
				<VStack spacing={8}>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>1</Badge>Title
						</FormLabel>
						<Input
							type={'text'}
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
						<FormHelperText>
							Use a name that uniquely identifies this operation. If you would
							like to make this a temporary operation (the results are not
							saved), you can leave this field blank.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>2</Badge>Ellipsoid
						</FormLabel>
						<EllipsoidSelect
							onChange={e => {
								setEllipsoid(e);
							}}
						/>
						<FormHelperText>
							Select the ellipsoid to use for the calculation.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>3</Badge>Latitude
						</FormLabel>
						<Heading
							as="h5"
							size="sm"
						></Heading>
						<AngleInput
							onChange={x => {
								setLatitude(x);
							}}
						/>
						<FormHelperText>
							Enter the latitude at which to calculate the radii of curvature.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>
							<Badge mr={2}>4</Badge>Azimuth{' '}
							<Badge
								colorScheme={'purple'}
								mx={1}
							>
								Optional
							</Badge>
						</FormLabel>
						<Heading
							as="h5"
							size="sm"
						></Heading>
						<AngleInput
							onChange={x => {
								setAzimuth(x);
							}}
						/>
						<FormHelperText>
							Enter the azimuth at which to calculate the radii of curvature at
							an azimuth.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<Button
							leftIcon={waiting ? <Spinner size={'sm'} /> : <CheckIcon />}
							isDisabled={ellipsoid === ''}
							onClick={submit}
						>
							Submit
						</Button>
					</FormControl>
				</VStack>
			</CommonPage>
		</>
	);
}
