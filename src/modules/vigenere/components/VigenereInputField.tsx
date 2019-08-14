import { GlobalState } from '../../../components/CryptoViz';
import { InputFieldProps, InputField } from '../../../components/InputField';
import { injectWithState } from '../../../utils/wrapWithMobx';


function stateInjector({rootStore}: GlobalState): InputFieldProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw new Error('Un-instantiated Vigenere Cipher!');
	}

	return {
		value: rootStore.moduleStore.vigenereCipher.proposedInputText,
		placeholder: 'Ciphertext/Plaintext',
		classNamePrefix: 'vigenere-input-field',
		showErrors: true,
		error: rootStore.moduleStore.vigenereCipher.inputTextIllegalCharacters,
		setText: rootStore.moduleStore.vigenereCipher.setInputText
	};
}

interface StatefulVigenereInputTextFieldProps {}

const VigenereInputField = injectWithState<StatefulVigenereInputTextFieldProps>(stateInjector, InputField, 'VigenereInputField');

export {
	VigenereInputField
};