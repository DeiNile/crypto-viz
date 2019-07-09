import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { BaseTextButton, TextButtonProps } from '../../../components/TextButton';


function stateInjector({rootStore}: GlobalState): TextButtonProps {
	return {
		text: 'Encrypt',
		isEnabled: rootStore.algorithm.isValid,
		onClick: () => {
			rootStore.visualizerStore.resetHighlighter();
			rootStore.algorithm.encrypt();
		}
	};
}

interface StatefulEncryptButtonProps {}

const EncryptButton = injectWithState<StatefulEncryptButtonProps>(stateInjector, BaseTextButton, 'EncryptButton');

export {
	EncryptButton
};