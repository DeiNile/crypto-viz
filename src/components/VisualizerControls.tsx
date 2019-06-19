import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { StyledButton } from '../styled-components/StyledButton';
import { SpeedSelector } from './SpeedSelector';
import { cryptoGlobals } from '../stores/Globals';

interface VisualizerControlsProps {
	isPlaying: boolean;
	canPlay: boolean;
	canNext: boolean;
	canBack: boolean;
	next(): void;
	back(): void;
	play(): void;
	stop(): void;
}

const BaseVisualizerControls: React.SFC<VisualizerControlsProps> = (props: VisualizerControlsProps) => {
	const { isPlaying, canNext, canBack, canPlay, next, back, play, stop } = props;

	return (
		<div>
			<StyledButton onClick={back} disabled={!canBack} >
				Back
			</StyledButton>

			{
				!isPlaying
					? (
						<StyledButton disabled={!canPlay} onClick={play} >
							Play
						</StyledButton>
					)
					: (
						<StyledButton onClick={stop} >
							Stop
						</StyledButton>
					)
			}

			<StyledButton onClick={next} disabled={!canNext} >
				Next
			</StyledButton>
			<SpeedSelector
				currentSpeed={cryptoGlobals.visualizerControlStore.animationSpeed}
				availableSpeeds={cryptoGlobals.visualizerControlStore.availableSpeeds}
				changeSpeed={cryptoGlobals.visualizerControlStore.setAnimationSpeed}
				disabled={!canNext && !canBack}
			/>
		</div>
	);
};

const VisualizerControls = wrapWithMobx<VisualizerControlsProps>(BaseVisualizerControls, 'VisualizerControls');

export {
	VisualizerControlsProps,
	VisualizerControls
};