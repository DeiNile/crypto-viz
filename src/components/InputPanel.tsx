import React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import styled from 'styled-components';
import { EncryptButton } from '../modules/caesar/components/EncryptButton';
import { DecryptButton } from '../modules/caesar/components/DecryptButton';
import { InputTextField } from '../modules/caesar/components/InputTextField';

interface InputPanelProps {
	className?: string;
}

const BaseInputPanel: React.SFC<InputPanelProps> = (props: InputPanelProps) => {
	const { className } = props;

	return (
		<div className={className}>
			<InputTextField />
			<div className='button-cluster'>
				<EncryptButton />
				<DecryptButton />
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