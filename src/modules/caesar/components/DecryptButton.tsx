import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { TextButtonProps, BaseTextButton } from '../../../components/TextButton';
import { assertUninitializedCeasarCipher, assertUninitializedCeasarCipherVisualizer } from '../../vigenere/utils/assertUnitializer';

function stateInjector({rootStore}: GlobalState): TextButtonProps {

	if (rootStore.moduleStore.ceasarCipher === null) {
		throw assertUninitializedCeasarCipher();
	}

	if (rootStore.moduleStore.ceasarVisualizerStore === null) {
		throw assertUninitializedCeasarCipherVisualizer();
	}

	const { ceasarVisualizerStore, ceasarCipher } = rootStore.moduleStore;

	return {
		text: 'Decrypt',
		classNamePrefix: 'caesar-button',
		isEnabled: rootStore.moduleStore.ceasarCipher.isValid,
		onClick: () => {
			ceasarVisualizerStore.resetHighlighter();
			ceasarCipher.decrypt();
		}
	};
}

interface StatefulDecryptButtonProps {}

const DecryptButton = injectWithState<StatefulDecryptButtonProps>(stateInjector, BaseTextButton, 'DecryptButton');

export {
	DecryptButton
};