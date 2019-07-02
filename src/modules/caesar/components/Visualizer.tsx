import React from 'react';
import { wrapWithMobx } from '../../../utils/wrapWithMobx';
import styled from 'styled-components';
import { StyledCaesarExplanation } from './CaesarExplanation';
import { CaesarVisualizerControls } from './CaesarVisualizerControls';
import { CeasarCipherCanvas } from './CeasarCipherCanvas';

interface VisualizerProps {
	className?: string;
}

const BaseVisualizer: React.SFC<VisualizerProps> = (props: VisualizerProps) => {

	const { className } = props;

	// if (!(rootStore.algorithm instanceof CeasarCipher)) {
	// 	return null;
	// }


	return (
		<div className={`visualizer ${className}`}>
			<div className='canvas'>
				<CeasarCipherCanvas />
				<CaesarVisualizerControls />
			</div>
			<div className='algorithm-explanation'>
				<StyledCaesarExplanation />
			</div>
		</div>
	);
};

const Visualizer = wrapWithMobx<VisualizerProps>(BaseVisualizer, 'Visualizer');

const StyledVisualizer = styled(Visualizer)`
	display: flex;
	flex-direction: row;

	.canvas {
		display: flex;
		flex-direction: column;
		flex: 3 1 auto;
	}

	.algorithm-explanation {
		display: flex;
		flex: 1 1 auto;
		justify-content: flex-end;
	}
`;

export {
	Visualizer,
	StyledVisualizer
};