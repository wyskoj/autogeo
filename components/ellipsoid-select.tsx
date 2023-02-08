import { Select } from '@chakra-ui/react';
import { Ellipsoids } from '../comps/operations/geodetic/ellipsoids';

export default function EllipsoidSelect(props: {
	onChange: (newValue: string) => void;
}) {
	return (
		<Select
			placeholder="Select an ellipsoid"
			onChange={e => {
				props.onChange(e.target.value);
			}}
		>
			{/*<option value="option1">Option 1</option>*/}
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
