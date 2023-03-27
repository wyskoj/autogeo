import { OperationData } from './operation-instance';

/** The result of parsing an ADJUST file. */
export type ParseResult<T extends OperationData> = {
	/** The title of the operation, as defined in the ADJUST file. */
	title: string;
	/** The parsed data. */
	data: T;
};
