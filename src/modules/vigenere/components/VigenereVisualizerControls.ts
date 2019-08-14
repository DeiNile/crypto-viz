import { GlobalState } from '../../../components/CryptoViz';
import { VisualizerControlsProps, VisualizerControls } from '../../../components/VisualizerControls';
import { assertUnitializedVigenereVisualizer } from '../utils/assertUnitializer';
import { VigenereVisualizerStore } from '../stores/VigenereVisualizerStore';
import { injectWithState } from '../../../utils/wrapWithMobx';


function stateInjector({ rootStore }: GlobalState): VisualizerControlsProps {

	if (rootStore.moduleStore.vigenereVisualizerStore === null) {
		throw assertUnitializedVigenereVisualizer();
	}
	const visualizerStore: VigenereVisualizerStore = rootStore.moduleStore.vigenereVisualizerStore;

	return {
		isVisible: visualizerStore.hasSteps,
		isPlaying: visualizerStore.isPlaying,
		canPlay: visualizerStore.canPlay,
		canNext: visualizerStore.canStepForward,
		canBack: visualizerStore.canStepBackward,
		play: () => visualizerStore.play(rootStore.visualizerControlStore.animationSpeedInMs),
		stop: visualizerStore.stop,
		next: visualizerStore.stepForward,
		back: visualizerStore.stepBackwards
	};
}

interface StatefulVigenereVisualizerControlsProps {}

const VigenereVisualizerControls = injectWithState<StatefulVigenereVisualizerControlsProps>(
	stateInjector,
	VisualizerControls,
	'VigenereVisualizerControls'
);

export {
	VigenereVisualizerControls
};