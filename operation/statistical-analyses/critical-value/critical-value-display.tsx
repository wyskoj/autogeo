import {
	CriticalValueData,
	CriticalValueNormalDataSchema,
} from './critical-value-data';
import { CriticalValueResult } from './critical-value-result';
import {
	DataResult,
	DisplaySpinner,
} from '../../../components/display/display-common';
import capitalize from '../../../utils/capitalize';
import { useSettings } from '../../../hooks/use-settings';

export function CriticalValueDisplay(props: {
	data: CriticalValueData;
	result: CriticalValueResult;
}) {
	const { settings } = useSettings();
	if (!settings) {
		return <DisplaySpinner />;
	}

	const normalParse = CriticalValueNormalDataSchema.safeParse(props.data);
	if (normalParse.success) {
		return (
			<DataResult
				data={[
					{
						label: 'Distribution type',
						value: capitalize(normalParse.data.type),
					},
					{
						label: 'Probability',
						value: normalParse.data.probability,
					},
				]}
				result={[
					{
						label: 'Critical value',
						value: props.result.value.toFixed(
							settings.criticalValueDecimalPlaces
						),
					},
				]}
			></DataResult>
		);
	}

	return <>¯\_(ツ)_/¯</>;
}