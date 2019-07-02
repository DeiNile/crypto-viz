import * as React from 'react';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { StyledButton } from '../../../styled-components/StyledButton';
import { GlobalState } from '../../../components/CryptoViz';

interface DecryptButtonProps {
	isDisabled: boolean;
	onClick(): void;
}

const BaseDecryptButton: React.SFC<DecryptButtonProps> = (props: DecryptButtonProps) => {
	const { isDisabled, onClick } = props;

	return (
		<StyledButton disabled={isDisabled} onClick={onClick}>
			Decrypt
		</StyledButton>
	);
};

function stateInjector({rootStore}: GlobalState): DecryptButtonProps {
	return {
		isDisabled: !rootStore.algorithm.isValid,
		onClick: () => {
			rootStore.visualizerStore.resetHighlighter();
			rootStore.algorithm.decrypt();
		}
	};
}

interface StatefulDecryptButtonProps {}

const DecryptButton = injectWithState<StatefulDecryptButtonProps>(stateInjector, BaseDecryptButton, 'DecryptButton');

export {
	DecryptButton
};