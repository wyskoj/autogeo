import { OperationCategory } from '../types/operation-category';
import { Operation, OperationInfo, operations } from '../types/operation';

// Finds the category that contains a given operation.
export function categoryByOperation(
	op: Operation
): OperationCategory | undefined {
	for (let key in operations) {
		if (operations[key as OperationCategory].find(it => it.id === op))
			return key as OperationCategory;
	}
	return undefined;
}

// Returns the display name of a given operation.
export function operationName(op: Operation): string | undefined {
	for (let key in operations) {
		const find = operations[key as OperationCategory].find(it => it.id === op);
		if (find) return find.name;
	}
	return undefined;
}

// Returns the information about an operation.
export function operationInfo(op: Operation): OperationInfo {
	return operations[categoryByOperation(op) as OperationCategory].find(
		it => it.id === op
	)!!;
}
