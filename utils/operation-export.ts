import { ExportFormat } from '../types/export-format';
import { OperationInstance } from '../operation/operation-instance';
import { OperationExport } from '../operation/operation';

export default function ExportOperationInstance(
	instance: OperationInstance,
	format: ExportFormat
): any {
	let exportFunc = OperationExport[instance.operation]!!;
	return exportFunc(instance, format);
}
