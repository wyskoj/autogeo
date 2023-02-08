export default class StringReader {
	private readonly lines: string[];
	private index: number;

	constructor(data: string) {
		this.lines = data.split('\n');
		this.index = 0;
	}

	// Read a line from the string
	readLine() {
		return this.lines[this.index++];
	}
}
