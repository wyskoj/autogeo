import { Operation } from '../types/operation';
import { OperationData, OperationResults } from '../types/operation-instance';
import { operationInfo } from './operation';

export default function DynamicProcess(
	data: OperationData,
	operation: Operation
): OperationResults {
	return operationInfo(operation).operate(data) as OperationResults;
}
