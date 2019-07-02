import * as React from 'react';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { StyledButton } from '../../../styled-components/StyledButton';
import { GlobalState } from '../../../components/CryptoViz';

interface EncryptButtonProps {
	isDisabled: boolean;
	onClick(): void;
}

const BaseEncryptButton: React.SFC<EncryptButtonProps> = (props: EncryptButtonProps) => {
	const { isDisabled, onClick } = props;

	return (
		<StyledButton disabled={isDisabled} onClick={onClick}>
			Encrypt
		</StyledButton>
	);
};

function stateInjector({rootStore}: GlobalState): EncryptButtonProps {
	return {
		isDisabled: !rootStore.algorithm.isValid,
		onClick: () => {
			rootStore.visualizerStore.resetHighlighter();
			rootStore.algorithm.encrypt();
		}
	};
}

interface StatefulEncryptButtonProps {}

const EncryptButton = injectWithState<StatefulEncryptButtonProps>(stateInjector, BaseEncryptButton, 'EncryptButton');

export {
	EncryptButton
};