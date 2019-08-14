import { InputField, InputFieldProps } from '../../../components/InputField';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';

function stateInjector({rootStore}: GlobalState): InputFieldProps {
	return {
		value: rootStore.algorithm.proposedInputText,
		placeholder: 'Ciphertext / Plaintext',
		classNamePrefix: 'caesar-input-field',
		showErrors: !rootStore.algorithm.isValid,
		error: rootStore.algorithm.errorMessage,
		setText: rootStore.algorithm.setInputText
	};
}

interface StatefulInputTextFieldProps {}

const InputTextField = injectWithState<StatefulInputTextFieldProps>(stateInjector, InputField, 'InputTextField');

export {
	InputTextField
};