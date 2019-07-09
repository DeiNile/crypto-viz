import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { SpeedSelector } from './SpeedSelector';
import { TextButton } from './TextButton';

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
			<TextButton text='Back' onClick={back} isEnabled={canBack} />
			{!isPlaying
				? <TextButton text='Play' onClick={play} isEnabled={canPlay} />
				: <TextButton text='Stop' onClick={stop} isEnabled={true} />
			}
			<TextButton text='Next' onClick={next} isEnabled={canNext} />
			<SpeedSelector
				isEnabled={canNext || canBack}
			/>
		</div>
	);
};

const VisualizerControls = wrapWithMobx<VisualizerControlsProps>(BaseVisualizerControls, 'VisualizerControls');

export {
	VisualizerControlsProps,
	VisualizerControls
};