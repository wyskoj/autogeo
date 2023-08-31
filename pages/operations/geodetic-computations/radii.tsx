import { PreloadEditProps } from '../../../types/operation/preload-props';
import { GetServerSidePropsContext } from 'next';
import {
	DMSSchema,
} from '../../../components/form-components';
import { z } from 'zod';
import CommonPage from '../../../components/common-page';
import { EllipsoidNameSchema } from '../../../operation/misc/ellipsoid/ellipsoid-types';
import { RadiiData } from '../../../operation/geodetic-computations/radii/radii-data';
import { RadiiResult } from '../../../operation/geodetic-computations/radii/radii-result';
import { RadiiComp } from '../../../operation/geodetic-computations/radii/radii-comp';
import { DMSToRadians, radiansToDMS } from '../../../utils/angle';
import RadiiDisplay from '../../../operation/geodetic-computations/radii/radii-display';
import { FormFactory } from '../../../components/form-factory';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null,
		} satisfies PreloadEditProps,
	};
}

export default function Radii(props: PreloadEditProps) {
	const radiiInputSchema = z.object({
		title: z.string(),
		ellipsoid: EllipsoidNameSchema,
		latitude: DMSSchema,
		azimuth: DMSSchema.optional(),
	});

	return (
		<CommonPage
			title={'Radii'}
			description={
				'Calculates the radii of curvature of the ellipsoid at a given latitude.'
			}
		>
			<FormFactory<RadiiData, RadiiResult>
				schema={radiiInputSchema}
				isTempAble={true}
				captions={{
					ellipsoid: 'Select the ellipsoid to use for the calculation.',
					latitude:
						'Enter the latitude at which to calculate the radii of curvature.',
					azimuth:
						'Enter the azimuth at which to calculate the radii of curvature at an azimuth.',
				}}
				transform={values => {
					return {
						ellipsoid: values.ellipsoid,
						latitude: DMSToRadians(
							values.latitude.degrees,
							values.latitude.minutes,
							values.latitude.seconds
						),
						azimuth: DMSToRadians(
							values.azimuth.degrees,
							values.azimuth.minutes,
							values.azimuth.seconds
						),
					} satisfies RadiiData;
				}}
				reverseTransform={instance => {
					const data = instance.data as RadiiData;
					return {
						title: instance.name,
						ellipsoid: data.ellipsoid,
						latitude: {
							degrees: radiansToDMS(data.latitude).d,
							minutes: radiansToDMS(data.latitude).m,
							seconds: radiansToDMS(data.latitude).s,
						},
						azimuth: {
							degrees: radiansToDMS(data.azimuth).d,
							minutes: radiansToDMS(data.azimuth).m,
							seconds: radiansToDMS(data.azimuth).s,
						},
					};
				}}
				comp={RadiiComp}
				display={RadiiDisplay}
				operation={'radii'}
				edit={props.edit}
			/>
		</CommonPage>
	);
}
