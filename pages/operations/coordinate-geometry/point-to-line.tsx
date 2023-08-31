import { GetServerSidePropsContext } from 'next';
import { PreloadEditProps } from '../../../types/operation/preload-props';
import { z } from 'zod';
import React from 'react';
import CommonPage from '../../../components/common-page';
import { FormFactory } from '../../../components/form-factory';
import { PointToLineData } from '../../../operation/coordinate-geometry/point-to-line/point-to-line-data';
import { PointToLineResult } from '../../../operation/coordinate-geometry/point-to-line/point-to-line-result';
import { OperationDescription, OperationName } from '../../../operation/operation';
import { PointToLineComp } from '../../../operation/coordinate-geometry/point-to-line/point-to-line-comp';
import { PointToLineDisplay } from '../../../operation/coordinate-geometry/point-to-line/point-to-line-display';
import { XYSchema } from '../../../components/form-components';

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const edit = context.query['edit'];
	return {
		props: {
			edit: edit ? (Array.isArray(edit) ? edit[0] : edit) : null
		} satisfies PreloadEditProps
	};
}

export default function Radii(props: PreloadEditProps) {
	const pointToLineInputSchema = z.object({
		title: z.string(), station1: XYSchema, station2: XYSchema, point: XYSchema
	});

	return (<CommonPage
			title={OperationName['point-to-line']}
			description={OperationDescription['point-to-line']}
		>
			<FormFactory<PointToLineData, PointToLineResult>
				schema={pointToLineInputSchema}
				isTempAble={true}
				captions={{
					station1: 'Enter the coordinates of the first station on the line.',
					station2: 'Enter the coordinates of the second station on the line.',
					point: 'Enter the coordinates of the point.'
				}}
				transform={values => {
					return {
						station1: { x: values.station1.x, y: values.station1.y, station: 'A' },
						station2: { x: values.station2.x, y: values.station2.y, station: 'B' },
						point: { x: values.point.x, y: values.point.y, station: 'P' }
					} satisfies PointToLineData;
				}}
				reverseTransform={instance => {
					const data = instance.data as PointToLineData;
					return {
						title: instance.name,
						station1: { x: data.station1.x, y: data.station1.y },
						station2: { x: data.station2.x, y: data.station2.y },
						point: { x: data.point.x, y: data.point.y }
					};
				}}
				comp={PointToLineComp}
				display={PointToLineDisplay}
				operation={'point-to-line'}
				edit={props.edit}
			/>
		</CommonPage>);
}
