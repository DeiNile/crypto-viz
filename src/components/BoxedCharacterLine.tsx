import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { BoxedCharacter } from './BoxedCharacter';
import { Dimension } from '../stores/Geometry';

interface BoxedCharacterLineProps {
	characters: string[];
	x: number;
	y: number;
	fontSize: number;
	boxSize?: Dimension;
	boxAlternatingColor?: string;
}

const DEFAULT_CHARACTER_BOX_WIDTH: number = 16;
const DEFAULT_CHARACTER_BOX_HEIGHT: number = 16;

const BaseBoxedCharacterLine: React.SFC<BoxedCharacterLineProps> = (props: BoxedCharacterLineProps) => {
	const { characters, x, y, boxSize, fontSize } = props;

	const boxWidth: number = boxSize === undefined
		? DEFAULT_CHARACTER_BOX_WIDTH
		: boxSize.width;
	const boxHeight: number = boxSize === undefined
		? DEFAULT_CHARACTER_BOX_HEIGHT
		: boxSize.height;

	return (
		<g transform={`translate(${x}, ${y})`}>
			{
				characters.map((character: string, i: number) => {
					const boxX: number = boxWidth * i;

					return (<BoxedCharacter
						x={boxX}
						y={0}
						width={boxWidth}
						height={boxHeight}
						character={character}
						fontSize={fontSize}
						key={`${i}|${character}`}
					/>);
				})
			}
		</g>
	);
};

const BoxedCharacterLine = wrapWithMobx<BoxedCharacterLineProps>(BaseBoxedCharacterLine, 'BoxedCharacterLine');

export {
	BoxedCharacterLine,
	BoxedCharacterLineProps
};