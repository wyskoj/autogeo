import { OperationInstance } from '../types/operation-instance';
import { ExportFormat } from '../types/export-format';
import { operationInfo } from './operation';

export default function ExportOperationInstance(
	instance: OperationInstance,
	format: ExportFormat
): any {
	let exportFunc = operationInfo(instance.operation).export!!;
	let s = exportFunc(instance, format);
	return s;
}
