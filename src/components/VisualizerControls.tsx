import '../styles/VisualizerControls.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { SpeedSelector } from './SpeedSelector';
import { TextButton } from './TextButton';

interface VisualizerControlsProps {
	isVisible: boolean;
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
	const { isPlaying, canNext, canBack, canPlay, next, back, play, stop, isVisible } = props;

	if (!isVisible) {
		return null;
	}

	return (
		<div className='visualizer-controls'>
			<TextButton text='Back' onClick={back} isEnabled={canBack} classNamePrefix='visualizer-control' />
			{!isPlaying
				? <TextButton text='Play' onClick={play} isEnabled={canPlay} classNamePrefix='visualizer-control' />
				: <TextButton text='Stop' onClick={stop} isEnabled={true} classNamePrefix='visualizer-control' />
			}
			<TextButton text='Next' onClick={next} isEnabled={canNext} classNamePrefix='visualizer-control' />
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