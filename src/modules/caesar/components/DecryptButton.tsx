import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { TextButtonProps, BaseTextButton } from '../../../components/TextButton';

function stateInjector({rootStore}: GlobalState): TextButtonProps {
	return {
		text: 'Decrypt',
		isEnabled: rootStore.algorithm.isValid,
		onClick: () => {
			rootStore.visualizerStore.resetHighlighter();
			rootStore.algorithm.decrypt();
		}
	};
}

interface StatefulDecryptButtonProps {}

const DecryptButton = injectWithState<StatefulDecryptButtonProps>(stateInjector, BaseTextButton, 'DecryptButton');

export {
	DecryptButton
};