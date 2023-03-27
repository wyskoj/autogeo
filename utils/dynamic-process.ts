import { Operation } from '../types/operation';
import { OperationData, OperationResult } from '../types/operation-instance';
import { operationInfo } from './operation';

export default function DynamicProcess(
	data: OperationData,
	operation: Operation
): OperationResult {
	return operationInfo(operation).operate(data) as OperationResult;
}
