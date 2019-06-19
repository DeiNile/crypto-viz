import React from 'react';
import { StyledInputField } from './InputField';
import { cryptoGlobals } from '../stores/Globals';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { StyledButton } from '../styled-components/StyledButton';
import styled from 'styled-components';

interface InputPanelProps {
	className?: string;
}

const BaseInputPanel: React.SFC<InputPanelProps> = (props: InputPanelProps) => {
	const { className } = props;

	return (
		<div className={className}>
			<StyledInputField
				placeholder='Ciphertext / Plaintext'
				showErrors={!cryptoGlobals.algorithm.isValid}
				setText={cryptoGlobals.algorithm.setInputText}
				error={cryptoGlobals.algorithm.errorMessage}
			/>
			<div className='button-cluster'>
				<StyledButton
					disabled={!cryptoGlobals.algorithm.isValid}
					onClick={() => {
						cryptoGlobals.visualizerStore.resetHighlighter();
						cryptoGlobals.algorithm.encrypt();
					}}
				>
					Encrypt
				</StyledButton>
				<StyledButton
					disabled={!cryptoGlobals.algorithm.isValid}
					onClick={() => {
						cryptoGlobals.visualizerStore.resetHighlighter();
						cryptoGlobals.algorithm.decrypt();
					}}
				>
					Decrypt
				</StyledButton>
			</div>
		</div>
	);
};


const InputPanel = wrapWithMobx<InputPanelProps>(BaseInputPanel, 'InputPanel');

const StyledInputPanel = styled(InputPanel)`
	& > .button-cluster {
		display: flex;
		flex-direction: row;

		* {
			margin: 0 0.2rem;
		}
	}
`;

export {
	StyledInputPanel as InputPanel
};