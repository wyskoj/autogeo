export type CGProperty = {
	description: string;
	label: string;
	number_of: boolean;
	optional: boolean;
};

export type CGLine = {
	repeated: boolean;
	properties: CGProperty[];
	repetition_description: string;
};

export type CGSchema = CGLine[];

export type CGExample = {
	title: string;
	data: string;
};

export type CGDocs = {
	description: string;
	schema: CGSchema;
	examples: CGExample[];
};
