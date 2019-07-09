import * as React from 'react';
import { injectWithState } from '../utils/wrapWithMobx';
import { GlobalState } from './CryptoViz';

interface HighlighterProps {
	x: number;
	y: number;
	width: string | number;
	height: string | number;
	animationSpeed?: number;
	borderColor?: string;
}

const DEFAULT_BORDER_COLOR: string = 'red';

const BaseHighlighter: React.SFC<HighlighterProps> = (props: HighlighterProps) => {
	const {x, y, width, height, borderColor, animationSpeed } = props;

	const effectiveBorderColor: string = borderColor === undefined
		? DEFAULT_BORDER_COLOR
		: borderColor;

	const speed: number = animationSpeed !== undefined
		? animationSpeed
		: 500;

	return (
		<g className='svg-highlighter' transform={`translate(${x}, ${y})`} style={{transition: `${speed}ms ease-in-out`}} >
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

export {
	Highlighter
};