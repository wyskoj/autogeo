import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { useOperationInstances } from '../../../hooks/use-operation-instances';
import { useEffect, useState } from 'react';
import { EllipsoidName } from '../../../operation/misc/ellipsoid/ellipsoid-types';
import { v4 as uuid } from 'uuid';
import router from 'next/router';
import CommonPage from '../../../components/common-page';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	Badge,
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import EllipsoidSelect from '../../../components/ellipsoid-select';
import { CheckIcon } from '@chakra-ui/icons';
import { GeocentricInverseData } from '../../../operation/coordinate-computations/geocentric-inverse/geocentric-inverse-data';
import GeocentricInverseComp from '../../../operation/coordinate-computations/geocentric-inverse/geocentric-inverse-comp';
import { GeocentricInverseResult } from '../../../operation/coordinate-computations/geocentric-inverse/geocentric-inverse-result';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function GeocentricInverse(props: PreloadEditProps) {
	const { createInstance, operationInstances } = useOperationInstances();

	// FORM DATA
	const [title, setTitle] = useState<string | null>(null);
	const [ellipsoid, setEllipsoid] = useState<EllipsoidName | null>(null);
	const [x, setX] = useState<number | null>(null);
	const [y, setY] = useState<number | null>(null);
	const [z, setZ] = useState<number | null>(null);

	const [waiting, setWaiting] = useState(false);

	function validate() {
		if (!title || !ellipsoid) return false;
		const payload: GeocentricInverseData = {
			ellipsoid: ellipsoid,
			x: x ?? 0,
			y: y ?? 0,
			z: z ?? 0,
		};
		const result: GeocentricInverseResult = GeocentricInverseComp(payload);

		createInstance({
			name: title!!,
			result: result,
			id: props.edit ?? uuid(),
			new: true,
			operation: 'geocentric-inverse',
			data: payload,
			timestamp: new Date().valueOf(),
		});

		router.push('/dashboard');
	}

	useEffect(() => {
		if (props.edit && operationInstances) {
			const instance = operationInstances.find(
				instance => instance.id === props.edit
			);
			if (instance) {
				const data = instance.data as GeocentricInverseData;
				setTitle(instance.name);
				setEllipsoid(data.ellipsoid);
				setX(data.x);
				setY(data.y);
				setZ(data.z);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.edit, operationInstances]);

	return (
		<CommonPage
			title={'Geocentric Coordinates — Inverse'}
			description={
				<VStack>
					<Text>
						This operation converts geocentric cartesian coordinates to geodetic
						coordinates.
					</Text>
					<Alert
						status="warning"
						borderRadius={'lg'}
					>
						<AlertIcon />
						<AlertDescription>
							This operation does not yet support loading ADJUST files.
						</AlertDescription>
					</Alert>
				</VStack>
			}
		>
			<VStack
				spacing={8}
				align={'start'}
			>
				{/* Title */}
				<FormControl isInvalid={title === ''}>
					<FormLabel>
						<Badge mr={2}>1</Badge>Title
					</FormLabel>
					<Input
						type={'text'}
						value={title ?? ''}
						onChange={e => setTitle(e.target.value)}
					/>
					<FormHelperText>
						Use a name that uniquely identifies this operation.
					</FormHelperText>
					<FormErrorMessage>Title is required.</FormErrorMessage>
				</FormControl>
				{/* Ellipsoid */}
				<FormControl>
					<FormLabel>
						<Badge mr={2}>2</Badge>Ellipsoid
					</FormLabel>
					<EllipsoidSelect
						value={ellipsoid}
						onChange={ellipsoid => {
							setEllipsoid(ellipsoid);
						}}
					/>
					<FormHelperText>
						Select the ellipsoid to use for the calculation.
					</FormHelperText>
					<FormErrorMessage>Ellipsoid is required.</FormErrorMessage>
				</FormControl>
				{/* Geodetic Coordinates */}
				<FormControl>
					<FormLabel>
						<Badge mr={2}>3</Badge>Cartesian coordinates
					</FormLabel>
					<HStack>
						<Input
							placeholder={'X'}
							value={x ?? ''}
							type={'number'}
							onChange={e => setX(parseFloat(e.target.value))}
						/>
						<Input
							placeholder={'Y'}
							value={y ?? ''}
							type={'number'}
							onChange={e => setY(parseFloat(e.target.value))}
						/>
						<Input
							placeholder={'Z'}
							value={z ?? ''}
							type={'number'}
							onChange={e => setZ(parseFloat(e.target.value))}
						/>
					</HStack>
					<FormHelperText>
						Enter the geocentric cartesian coordinates in meters.
					</FormHelperText>
					<FormErrorMessage>
						Geodetic coordinates are required.
					</FormErrorMessage>
				</FormControl>
				{/* Submit */}
				<Button
					leftIcon={waiting ? <Spinner size={'sm'} /> : <CheckIcon />}
					isDisabled={!title || !ellipsoid}
					onClick={validate}
				>
					{props.edit ? 'Save changes' : 'Submit'}
				</Button>
			</VStack>
		</CommonPage>
	);
}
