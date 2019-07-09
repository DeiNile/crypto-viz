import * as React from 'react';
import { wrapWithMobx } from '../../../utils/wrapWithMobx';

interface VigenereModuleProps {}

const BaseVigenereModule: React.SFC<VigenereModuleProps> = (props: VigenereModuleProps) => {

	return (
		<div className='vigenere-module'>

		</div>
	);
};

const VigenereModule = wrapWithMobx<VigenereModuleProps>(BaseVigenereModule, 'VigenereModule');

export {
	VigenereModule
};