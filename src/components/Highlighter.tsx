import * as React from 'react';
import { injectWithState } from '../utils/wrapWithMobx';
import styled from 'styled-components';
import { GlobalState } from './CryptoViz';

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

type InjectedHighlighterProps = Pick<HighlighterProps, 'animationSpeed'>;
type StateFulHighlighterProps = Omit<HighlighterProps, keyof InjectedHighlighterProps>;

function stateInjector({rootStore}: GlobalState): InjectedHighlighterProps {
	return {
		animationSpeed: rootStore.visualizerControlStore.animationSpeedInMs
	};
}

const Highlighter = injectWithState<StateFulHighlighterProps>(stateInjector, BaseHighlighter, 'Highlighter');

const StyledHighlighter = styled(Highlighter)`
	transition: transform ${(props) => {
		// @ts-ignore
		return props.animationSpeed !== undefined
		// @ts-ignore
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