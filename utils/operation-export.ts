import { ExportFormat } from '../types/export-format';
import { OperationInstance } from '../operation/operation-instance';
import { OperationExport } from '../operation/operation';
import { UserSettings } from '../hooks/use-settings';

export default function ExportOperationInstance(
	instance: OperationInstance,
	format: ExportFormat,
	settings: UserSettings
): any {
	let exportFunc = OperationExport[instance.operation]!!;
	return exportFunc(instance, format, settings);
}
