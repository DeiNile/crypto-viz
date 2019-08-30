import { InputField, InputFieldProps } from '../../../components/InputField';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { assertUninitializedCeasarCipherVisualizer, assertUninitializedCeasarCipher } from '../../vigenere/utils/assertUnitializer';

function stateInjector({rootStore}: GlobalState): InputFieldProps {

	if (rootStore.moduleStore.ceasarCipher === null) {
		throw assertUninitializedCeasarCipher();
	}

	if (rootStore.moduleStore.ceasarVisualizerStore === null) {
		throw assertUninitializedCeasarCipherVisualizer();
	}

	return {
		value: rootStore.moduleStore.ceasarCipher.proposedInputText,
		placeholder: 'Ciphertext / Plaintext',
		classNamePrefix: 'caesar-input-field',
		showErrors: !rootStore.moduleStore.ceasarCipher.isValid,
		error: rootStore.moduleStore.ceasarCipher.errorMessage,
		setText: rootStore.moduleStore.ceasarCipher.setInputText
	};
}

interface StatefulInputTextFieldProps {}

const InputTextField = injectWithState<StatefulInputTextFieldProps>(stateInjector, InputField, 'InputTextField');

export {
	InputTextField
};