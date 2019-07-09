import '../styles/Visualizer.scss';
import React from 'react';
import { wrapWithMobx } from '../../../utils/wrapWithMobx';
import { CaesarExplanation } from './CaesarExplanation';
import { CaesarVisualizerControls } from './CaesarVisualizerControls';
import { CeasarCipherCanvas } from './CeasarCipherCanvas';

interface VisualizerProps {
}

const BaseVisualizer: React.SFC<VisualizerProps> = (props: VisualizerProps) => {

	return (
		<div className='caesar-visualizer'>
			<div className='canvas'>
				<CeasarCipherCanvas />
				<CaesarVisualizerControls />
			</div>
			<div className='algorithm-explanation'>
				<CaesarExplanation />
			</div>
		</div>
	);
};

const Visualizer = wrapWithMobx<VisualizerProps>(BaseVisualizer, 'Visualizer');

export {
	Visualizer
};