import * as React from 'react';
import { wrapWithMobx } from '../../../utils/wrapWithMobx';
import { InputPanel } from '../../../components/InputPanel';
import { StyledVisualizer } from './Visualizer';

interface BaseCaesarModuleProps {

}

const BaseCaesarModule: React.SFC<BaseCaesarModuleProps>= (props: BaseCaesarModuleProps) => {
	return (
		<div className='caesar-module'>
			<InputPanel />
			<StyledVisualizer />
		</div>
	);
};

const CaesarModule = wrapWithMobx<BaseCaesarModuleProps>(BaseCaesarModule, 'CaesarModule');

export {
	CaesarModule
};