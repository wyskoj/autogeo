import { Select } from '@chakra-ui/react';
import {
	EllipsoidName,
	EllipsoidNameSchema,
} from '../operation/misc/ellipsoid/ellipsoid-types';
import { Ellipsoids } from '../operation/misc/ellipsoid/ellipsoid-defs';

type EllipsoidSelectProps = {
	/** The function to call when the selected ellipsoid changes. */
	onChange: (newValue: EllipsoidName | null) => void;
	/** The currently selected ellipsoid. */
	value: EllipsoidName | null;
};

/**
 * A select component for selecting an ellipsoid from a list of available ellipsoids.
 */
export default function EllipsoidSelect(props: EllipsoidSelectProps) {
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
