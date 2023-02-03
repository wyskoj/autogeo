import React from 'react';
import { MathComponent } from 'mathjax-react';

// @ts-ignore
const Math = ({ block = false, children }) => (
	<MathComponent
		display={block}
		tex={String.raw`${children}`}
	/>
);

export default Math;
