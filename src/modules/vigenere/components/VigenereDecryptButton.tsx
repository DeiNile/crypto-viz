import { GlobalState } from '../../../components/CryptoViz';
import { TextButtonProps, BaseTextButton } from '../../../components/TextButton';
import { injectWithState } from '../../../utils/wrapWithMobx';

function stateInjector({ rootStore }: GlobalState): TextButtonProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw new Error('Un-instatiated Vigenere Cipher!');
	}

	return {
		text: 'Decrypt',
		classNamePrefix: 'vigenere-decrypt-button',
		isEnabled: rootStore.moduleStore.vigenereCipher.isValid,
		onClick: rootStore.moduleStore.vigenereCipher.decrypt
	};
}

interface StatefulVigenereDecryptButtonProps {}

const VigenereDecryptButton = injectWithState<StatefulVigenereDecryptButtonProps>(stateInjector, BaseTextButton, 'VigenereDecryptButton');

export {
	VigenereDecryptButton
};