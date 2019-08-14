import '../styles/VigenereVisualizer.scss';
import React from 'react';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { AlignedLabeledText } from './AlignedLabeledText';
import { VigenereTable } from './VigenereTable';
import { VigenereVisualizerControls } from './VigenereVisualizerControls';
import { VigenereExplanation } from './VigenereExplanation';

interface VigenereVisualizerProps {
	isVisible: boolean;
}

const BaseVigenereVisualizer: React.SFC<VigenereVisualizerProps> = (props: VigenereVisualizerProps) => {
	return (
		<div className='vigenere-visualizer'>
			<div className='visualizer'>
				<AlignedLabeledText />
				<VigenereTable />
				<VigenereVisualizerControls />
			</div>
			<div className='vigenere-explainer'>
				<VigenereExplanation />
			</div>
		</div>
	);
};

interface StatefulVigenereVisualizerProps {}

function stateInjector({rootStore}: GlobalState): VigenereVisualizerProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw new Error('Un-initialized Vigenere Cipher');
	}

	return {
		isVisible: rootStore.moduleStore.vigenereCipher.hasEncryptedDecrypted
	};
}

const VigenereVisualizer = injectWithState<StatefulVigenereVisualizerProps>(stateInjector, BaseVigenereVisualizer, 'VigenereVisualizer');

export {
	VigenereVisualizer
};