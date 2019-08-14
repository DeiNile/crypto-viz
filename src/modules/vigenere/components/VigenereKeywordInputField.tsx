import { GlobalState } from '../../../components/CryptoViz';
import { InputFieldProps, InputField } from '../../../components/InputField';
import { injectWithState } from '../../../utils/wrapWithMobx';

function stateInjector({rootStore}: GlobalState): InputFieldProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw new Error('Vigenere Cipher not initialized');
	}

	return {
		value: rootStore.moduleStore.vigenereCipher.proposedKeyword,
		placeholder: 'Keyword',
		classNamePrefix: 'vigenere-keyword-field',
		showErrors: true,
		error: rootStore.moduleStore.vigenereCipher.keywordIllegalCharacters,
		warning: rootStore.moduleStore.vigenereCipher.keywordLengthWarning !== null
			? rootStore.moduleStore.vigenereCipher.keywordLengthWarning
			: undefined,
		setText: rootStore.moduleStore.vigenereCipher.setKeyword
	};
}

interface StatefulVigenereInputFieldProps {}

const VigenereKeywordInputField = injectWithState<StatefulVigenereInputFieldProps>(stateInjector, InputField, 'VigenereKeywordInputField');

export {
	VigenereKeywordInputField
};