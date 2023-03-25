import { Select } from '@chakra-ui/react';
import { Ellipsoids } from '../comps/operations/geodetic/ellipsoids';
import {
	EllipsoidName,
	EllipsoidNameSchema,
} from '../types/operation/geodetic/ellipsoid';

export default function EllipsoidSelect(props: {
	onChange: (newValue: EllipsoidName | null) => void;
	value: EllipsoidName | null;
}) {
	return (
		<Select
			placeholder="Select an ellipsoid"
			onChange={e => {
				const parse = EllipsoidNameSchema.safeParse(e.target.value);
				if (parse.success) {
					props.onChange(parse.data);
				} else {
					props.onChange(null);
				}
			}}
			value={props.value ?? undefined}
		>
			{Object.keys(Ellipsoids).map((ellipsoid, i) => (
				<option
					value={ellipsoid}
					key={i}
				>
					{ellipsoid}
				</option>
			))}
		</Select>
	);
}
