import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { BaseTextButton, TextButtonProps } from '../../../components/TextButton';
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
		text: 'Encrypt',
		classNamePrefix: 'caesar-button',
		isEnabled: rootStore.moduleStore.ceasarCipher.isValid,
		onClick: () => {
			ceasarVisualizerStore.resetHighlighter();
			ceasarCipher.encrypt();
		}
	};
}

interface StatefulEncryptButtonProps {}

const EncryptButton = injectWithState<StatefulEncryptButtonProps>(stateInjector, BaseTextButton, 'EncryptButton');

export {
	EncryptButton
};