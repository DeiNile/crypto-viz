import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import styled from 'styled-components';

interface HighlighterProps {
	className?: string;
	x: number;
	y: number;
	width: string | number;
	height: string | number;
	animationSpeed?: number;
	borderColor?: string;
}

const DEFAULT_BORDER_COLOR: string = 'red';

const BaseHighlighter: React.SFC<HighlighterProps> = (props: HighlighterProps) => {
	const {x, y, width, height, borderColor, className} = props;

	const effectiveBorderColor: string = borderColor === undefined
		? DEFAULT_BORDER_COLOR
		: borderColor;

	return (
		<g className={className} transform={`translate(${x}, ${y})`} >
			<rect
				width={width}
				height={height}
				stroke={effectiveBorderColor}
				fill='none'
			/>
		</g>
	);
};

const Highlighter = wrapWithMobx<HighlighterProps>(BaseHighlighter, 'Highlighter');

const StyledHighlighter = styled(Highlighter)`
	transition: transform ${(props) => {
		return props.animationSpeed !== undefined
			? props.animationSpeed
			: 500;
	}}ms ease-in-out;
	transform: translate(
		${(props) => props.x},
		${(props) => props.y}
	);
`;

export {
	Highlighter,
	StyledHighlighter
};