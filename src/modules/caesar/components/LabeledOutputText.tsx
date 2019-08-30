import '../styles/LabeledOutputText.scss';
import { GlobalState } from '../../../components/CryptoViz';
import { LabeledProps, Labeled } from '../../../components/Labeled';
import { ACTION_TYPE } from '../stores/CeasarCipher';
import { highlightCharacterAt } from '../../../utils/highlightCharacterAt';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { assertUninitializedCeasarCipher, assertUninitializedCeasarCipherVisualizer } from '../../vigenere/utils/assertUnitializer';

function stateInjector({ rootStore }: GlobalState): LabeledProps {
	const highlightClassName: string = 'ceasar-output-text-highlight';

	if (rootStore.moduleStore.ceasarCipher === null) {
		throw assertUninitializedCeasarCipher();
	}

	if (rootStore.moduleStore.ceasarVisualizerStore === null) {
		throw assertUninitializedCeasarCipherVisualizer();
	}

	return {
		label: rootStore.moduleStore.ceasarCipher.lastAction === ACTION_TYPE.ENCRYPT
			? 'Ciphertext'
			: 'Plaintext',
		child: rootStore.moduleStore.ceasarCipher.outputText !== null && rootStore.moduleStore.ceasarVisualizerStore.canShowOutputTextHighlight
			? highlightCharacterAt(
				rootStore.moduleStore.ceasarCipher.outputText,
				highlightClassName,
				rootStore.moduleStore.ceasarVisualizerStore.relativeAnimationIndex
			)
			: highlightCharacterAt(rootStore.moduleStore.ceasarCipher.outputText!, highlightClassName)
	};
}

interface StatefulLabeledOutputTextProps {}

const LabeledOutputText = injectWithState<StatefulLabeledOutputTextProps>(stateInjector, Labeled, 'LabeledCeasarCipherOutputText');

export {
	LabeledOutputText
};