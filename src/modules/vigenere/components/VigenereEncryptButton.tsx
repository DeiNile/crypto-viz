import { TextButtonProps, BaseTextButton } from '../../../components/TextButton';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';

function stateInjetor({ rootStore }: GlobalState): TextButtonProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw new Error('Un-instatiated Vigenere Cipher!');
	}

	return {
		text: 'Encrypt',
		classNamePrefix: 'vigenere-encrypt-button',
		isEnabled: rootStore.moduleStore.vigenereCipher.isValid,
		onClick: rootStore.moduleStore.vigenereCipher.encrypt
	};
}

interface StatefulVigenereEncryptButtonProps {}

const VigenereEncryptButton = injectWithState<StatefulVigenereEncryptButtonProps>(stateInjetor, BaseTextButton, 'VigenereEncryptButton');

export {
	VigenereEncryptButton
};