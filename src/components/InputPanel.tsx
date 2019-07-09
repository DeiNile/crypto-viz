import '../styles/InputPanel.scss';
import React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { EncryptButton } from '../modules/caesar/components/EncryptButton';
import { DecryptButton } from '../modules/caesar/components/DecryptButton';
import { InputTextField } from '../modules/caesar/components/InputTextField';

interface InputPanelProps {
}

const BaseInputPanel: React.SFC<InputPanelProps> = (props: InputPanelProps) => {

	return (
		<div className='input-panel'>
			<InputTextField />
			<div className='button-cluster'>
				<EncryptButton />
				<DecryptButton />
			</div>
		</div>
	);
};


const InputPanel = wrapWithMobx<InputPanelProps>(BaseInputPanel, 'InputPanel');

export {
	InputPanel
};