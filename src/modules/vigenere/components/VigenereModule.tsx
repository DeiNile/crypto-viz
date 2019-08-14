import * as React from 'react';
import { wrapWithMobx } from '../../../utils/wrapWithMobx';
import { VigenereInputPanel } from './VIgenereInputPanel';
import { VigenereVisualizer } from './VigenereVisualizer';

interface VigenereModuleProps {}

const BaseVigenereModule: React.SFC<VigenereModuleProps> = (props: VigenereModuleProps) => {

	return (
		<div className='vigenere-module'>
			<VigenereInputPanel />
			<VigenereVisualizer />
		</div>
	);
};

const VigenereModule = wrapWithMobx<VigenereModuleProps>(BaseVigenereModule, 'VigenereModule');

export {
	VigenereModule
};