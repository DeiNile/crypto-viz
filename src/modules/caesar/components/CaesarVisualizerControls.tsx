import { VisualizerControlsProps, VisualizerControls } from '../../../components/VisualizerControls';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';

function stateInjector({rootStore}: GlobalState): VisualizerControlsProps {
	return {
		isVisible: rootStore.visualizerStore.hasSteps,
		isPlaying: rootStore.visualizerStore.isPlaying,
		canPlay: rootStore.visualizerStore.canPlay,
		canNext: rootStore.visualizerStore.canStepForward,
		canBack: rootStore.visualizerStore.canStepBackward,
		next: rootStore.visualizerStore.stepForward,
		back: rootStore.visualizerStore.stepBackward,
		play: rootStore.visualizerStore.play,
		stop: rootStore.visualizerStore.stop
	};
}

interface StatefulCaesarVisualizerControlProps {}

const CaesarVisualizerControls = injectWithState<StatefulCaesarVisualizerControlProps>(stateInjector, VisualizerControls, 'CaesarVisualizerControls');

export {
	CaesarVisualizerControls
};