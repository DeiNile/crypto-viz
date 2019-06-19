import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface BaseSvgCharacterProps {
	character: string;
	x: number;
	y: number;

	getPosition(position: DOMRect): void;
}

class BaseSvgCharacter extends React.Component<BaseSvgCharacterProps> {

	constructor(props: BaseSvgCharacterProps) {
		super(props);

		this.setRef = this.setRef.bind(this);
	}

	setRef(element: SVGTextElement) {
		if (element !== null && element !== undefined) {
			this.props.getPosition(element.getExtentOfChar(0));
		}
	}

	render() {
		const { character, x, y } = this.props;

		if (character.length > 1) {
			return null;
		}

		return <text x={x} y={y} ref={this.setRef} style={{dominantBaseline: 'text-before-edge'}}>{character}</text>;
	}
}

const SvgCharacter = wrapWithMobx<BaseSvgCharacterProps>(BaseSvgCharacter, 'SvgCharacter');

export {
	SvgCharacter
};