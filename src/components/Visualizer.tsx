import React from 'react';
import { CeasarCipherCanvas } from './CeasarCipherCanvas';
import { cryptoGlobals } from '../stores/Globals';
import { CeasarCipher, ACTION_TYPE } from '../stores/CeasarCipher';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { VisualizerControls } from './VisualizerControls';
import styled from 'styled-components';
import { StyledCaesarExplanation } from './CaesarExplanation';

interface VisualizerProps {
	className?: string;
}

const BaseVisualizer: React.SFC<VisualizerProps> = (props: VisualizerProps) => {

	const { className } = props;

	if (!(cryptoGlobals.algorithm instanceof CeasarCipher)) {
		return null;
	}


	return (
		<div className={`visualizer ${className}`}>
			<div className='canvas'>
				<CeasarCipherCanvas
					inputText={cryptoGlobals.algorithm.inputText}
					outputText={cryptoGlobals.algorithm.outputText}
					alphabet={CeasarCipher.alphabet}
					shiftedAlphabet={cryptoGlobals.algorithm.shitedAlphabet}
					steps={cryptoGlobals.algorithm.steps}
				/>
				<VisualizerControls
					isPlaying={cryptoGlobals.visualizerStore.isPlaying}
					canPlay={cryptoGlobals.visualizerStore.canPlay}
					canNext={cryptoGlobals.visualizerStore.canStepForward}
					canBack={cryptoGlobals.visualizerStore.canStepBackward}
					next={cryptoGlobals.visualizerStore.stepForward}
					back={cryptoGlobals.visualizerStore.stepBackward}
					play={cryptoGlobals.visualizerStore.play}
					stop={cryptoGlobals.visualizerStore.stop}
				/>
			</div>
			<div className='algorithm-explanation'>
			{
				cryptoGlobals.visualizerStore.currentlyHighlightedText === null
					? null
					: (
						<StyledCaesarExplanation
							isShowing={cryptoGlobals.visualizerStore.isShowingExplanation}
							currentStep={cryptoGlobals.visualizerStore.currentStep}
							isShowingText={cryptoGlobals.algorithm.inputText !== null && cryptoGlobals.algorithm.outputText !== null}
							isEncrypting={cryptoGlobals.algorithm.lastAction === ACTION_TYPE.ENCRYPT}
							animationStep={cryptoGlobals.visualizerStore.animationStep}
							shiftAmount={cryptoGlobals.algorithm.shiftAmount}
							setIsShowing={cryptoGlobals.visualizerStore.setIsShowingExplanation}
						/>

					)
			}
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