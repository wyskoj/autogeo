import { Operation } from '../operation/operation';
import {
	OperationData,
	OperationInstance,
	OperationResult,
} from '../operation/operation-instance';
import { v4 } from 'uuid';

export function BuildInstance(
	operation: Operation,
	name: string,
	data: OperationData,
	result: OperationResult,
	uuid?: string
): OperationInstance {
	return {
		data: data,
		id: uuid ?? v4(),
		name: name,
		new: true,
		operation: operation,
		result: result,
		timestamp: new Date().valueOf(),
	};
}
