import * as React from 'react';
import { StyledInputField } from '../../../components/InputField';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';

interface InputTextFieldProps {
	placeholder?: string;
	showErrors: boolean;
	error: string | null;

	setText(text: string): void;
}

const BaseInputTextField: React.SFC<InputTextFieldProps> = (props: InputTextFieldProps) => {
	const { placeholder, showErrors, error, setText } = props;

	return (
		<StyledInputField
			placeholder={placeholder}
			showErrors={showErrors}
			error={error}
			setText={setText}
		/>
	);
};

function stateInjector({rootStore}: GlobalState): InputTextFieldProps {
	return {
		placeholder: 'Ciphertext / Plaintext',
		showErrors: !rootStore.algorithm.isValid,
		error: rootStore.algorithm.errorMessage,
		setText: rootStore.algorithm.setInputText
	};
}

interface StatefulInputTextFieldProps {}

const InputTextField = injectWithState<StatefulInputTextFieldProps>(stateInjector, BaseInputTextField, 'InputTextField');

export {
	InputTextField
};