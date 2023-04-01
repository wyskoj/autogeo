import CommonPage from '../../../components/common-page';
import { useEffect, useState } from 'react';
import {
	Badge,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import EllipsoidSelect from '../../../components/ellipsoid-select';
import AngleInput from '../../../components/angle-input';
import { CheckIcon } from '@chakra-ui/icons';
import router from 'next/router';
import { v4 as uuid } from 'uuid';
import { GetServerSidePropsContext } from 'next';
import { useOperationInstances } from '../../../hooks/operation-instances';
import useDMS from '../../../hooks/use-dms';
import {
	DMStoDecimal,
	DMSToRadians,
	DMSToRadiansT,
} from '../../../utils/angle';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { RadiiComp } from '../../../operation/geodetic-computations/radii/radii-comp';
import { RadiiData } from '../../../operation/geodetic-computations/radii/radii-data';
import { RadiiResult } from '../../../operation/geodetic-computations/radii/radii-result';
import { EllipsoidName } from '../../../operation/misc/ellipsoid/ellipsoid-types';
import RadiiDisplay from '../../../operation/geodetic-computations/radii/radii-display';
import { OperationInstance } from '../../../operation/operation-instance';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function RadiiForm(props: PreloadEditProps) {
	const { operationInstances, createInstance, updateInstance } =
		useOperationInstances();

	// FORM DATA
	const [title, setTitle] = useState('');
	const [ellipsoid, setEllipsoid] = useState<EllipsoidName | null>(null);
	const [latitudeDMS, setLatDMS, setLatDD] = useDMS();
	const [azimuthDMS, setAziDMS, setAziDD] = useDMS();

	// TEMPORARY DATA
	const [tempData, setTempData] = useState<RadiiData | null>(null);
	const [tempResult, setTempResult] = useState<RadiiResult | null>(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [waiting, setWaiting] = useState(false);

	function submit() {
		const payload: RadiiData = {
			ellipsoid: ellipsoid as EllipsoidName,
			latitude: DMSToRadiansT(latitudeDMS),
			azimuth: DMSToRadiansT(azimuthDMS),
		};
		const result = RadiiComp(payload);

		if (title === '') {
			// Temporary operation, just display a modal with the results
			setTempData(payload);
			setTempResult(result);
			onOpen();
			return;
		}

		const instance: OperationInstance = {
			data: payload,
			id: uuid(),
			name: title.trim(),
			operation: 'radii',
			result: result,
			timestamp: new Date().valueOf(),
			new: true,
		};
		if (props.edit) {
			updateInstance(props.edit, instance);
		} else {
			createInstance(instance);
		}
		router.push('/dashboard');
	}

	// Preload
	useEffect(() => {
		if (props.edit && operationInstances) {
			const instance = operationInstances.find(
				instance => instance.id === props.edit
			);
			if (instance) {
				const data = instance.data as RadiiData;
				setTitle(instance.name);
				setEllipsoid(data.ellipsoid);
				setLatDD(data.latitude);
				setAziDD(data.azimuth);
			}
		}
	}, [operationInstances, props.edit, setAziDD, setLatDD]);

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
							value={ellipsoid}
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
							DMS={latitudeDMS}
							setDMS={setLatDMS}
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
							DMS={azimuthDMS}
							setDMS={setAziDMS}
						/>
						<FormHelperText>
							Enter the azimuth at which to calculate the radii of curvature at
							an azimuth.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<Button
							leftIcon={waiting ? <Spinner size={'sm'} /> : <CheckIcon />}
							isDisabled={!ellipsoid}
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
