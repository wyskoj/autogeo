import { OperationInstance } from '../../operation-instance';
import { ExportFormat } from '../../../types/export-format';

export function SpcsForwardsExport(
	operation: OperationInstance,
	format: ExportFormat
):string {
	const data = operation.data;
	const result = operation.result;

	return "";
}