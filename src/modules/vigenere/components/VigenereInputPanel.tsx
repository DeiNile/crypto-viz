import '../styles/VigenereInputPanel.scss';
import * as React from 'react';
import { wrapWithMobx } from '../../../utils/wrapWithMobx';
import { VigenereInputField } from './VigenereInputField';
import { VigenereKeywordInputField } from './VigenereKeywordInputField';
import { VigenereEncryptButton } from './VigenereEncryptButton';
import { VigenereDecryptButton } from './VigenereDecryptButton';

interface VigenereInputPanelProps {}

const BaseVigenereInputPanel: React.SFC<VigenereInputPanelProps> = (props: VigenereInputPanelProps) => {
	return (
		<div className='vigenere-input-panel'>
			<div className='input-text-fields'>
				<VigenereInputField />
				<VigenereKeywordInputField />
			</div>
			<div className='vigenere-button-cluser'>
				<VigenereEncryptButton />
				<VigenereDecryptButton />
			</div>
		</div>
	);
};

const VigenereInputPanel = wrapWithMobx<VigenereInputPanelProps>(BaseVigenereInputPanel, 'VigenereInputPanel');

export {
	VigenereInputPanel
};