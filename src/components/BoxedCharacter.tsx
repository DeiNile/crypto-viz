import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { SvgCharacter } from './SvgCharacter';
import { Point, Rectangle, centerInnerRectangleInsideOuter } from '../stores/Geometry';

interface BoxedCharacterProps {
	x: number;
	y: number;
	width: number;
	height: number;
	character: string;
	borderColor?: string;
	backgroundColor?: string;
	fontSize?: number;
	fontFamily?: string;
}

interface BoxedCharacterState {
	characterPosition: DOMRect | null;
}

class BaseBoxedCharacter extends React.Component<BoxedCharacterProps, BoxedCharacterState> {

	constructor(props: BoxedCharacterProps) {
		super(props);

		this.setPositionOfCharacter = this.setPositionOfCharacter.bind(this);
		this.getPositionForCharacter = this.getPositionForCharacter.bind(this);

		this.state = {
			characterPosition: null
		};
	}

	setPositionOfCharacter(position: DOMRect): void {
		const { characterPosition } = this.state;

		if (characterPosition === null) {
			this.setState({
				characterPosition: position
			});
		}
	}

	getPositionForCharacter(): Point {
		const { characterPosition } = this.state;
		const { width, height } = this.props;

		const borderRectangle: Rectangle = {
			x: 0,
			y: 0,
			width: width - 1,
			height: height
		};

		if (characterPosition === null) {
			return {
				x: 0,
				y: 0
			};
		}

		const centeredCharacterPosition: Rectangle = centerInnerRectangleInsideOuter(characterPosition, borderRectangle);

		return {
			x: centeredCharacterPosition.x,
			y: centeredCharacterPosition.y
		};
	}

	render() {
		const { character, x, y, height, width } = this.props;
		const characterPosition: Point = this.getPositionForCharacter();

		if (character.length > 1) {
			return null;
		}

		return (
			<g transform={`translate(${x}, ${y})`}>
				<rect
					transform='translate(0, 0)'
					width={width}
					height={height}
					rx={width * 0.2}
					ry={height * 0.2}
					fill='none'
					strokeWidth='1'
					stroke='#5A6268'
				/>
				<SvgCharacter
					x={characterPosition.x}
					y={characterPosition.y}
					getPosition={this.setPositionOfCharacter}
					character={character}
				/>
			</g>
		);
	}
}

const BoxedCharacter = wrapWithMobx<BoxedCharacterProps>(BaseBoxedCharacter, 'BoxedCharacter');

export {
	BoxedCharacter,
	BoxedCharacterProps
};