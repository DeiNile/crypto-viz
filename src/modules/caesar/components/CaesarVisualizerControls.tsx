import { VisualizerControlsProps, VisualizerControls } from '../../../components/VisualizerControls';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { assertUninitializedCeasarCipherVisualizer } from '../../vigenere/utils/assertUnitializer';

function stateInjector({rootStore}: GlobalState): VisualizerControlsProps {

	if (rootStore.moduleStore.ceasarVisualizerStore === null) {
		throw assertUninitializedCeasarCipherVisualizer();
	}

	return {
		isVisible: rootStore.moduleStore.ceasarVisualizerStore.hasSteps,
		isPlaying: rootStore.moduleStore.ceasarVisualizerStore.isPlaying,
		canPlay: rootStore.moduleStore.ceasarVisualizerStore.canPlay,
		canNext: rootStore.moduleStore.ceasarVisualizerStore.canStepForward,
		canBack: rootStore.moduleStore.ceasarVisualizerStore.canStepBackward,
		next: rootStore.moduleStore.ceasarVisualizerStore.stepForward,
		back: rootStore.moduleStore.ceasarVisualizerStore.stepBackward,
		play: rootStore.moduleStore.ceasarVisualizerStore.play,
		stop: rootStore.moduleStore.ceasarVisualizerStore.stop
	};
}

interface StatefulCaesarVisualizerControlProps {}

const CaesarVisualizerControls = injectWithState<StatefulCaesarVisualizerControlProps>(stateInjector, VisualizerControls, 'CaesarVisualizerControls');

export {
	CaesarVisualizerControls
};