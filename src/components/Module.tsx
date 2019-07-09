import * as React from 'react';
import { ModuleTypes } from '../stores/ModuleStore';
import { CaesarModule } from '../modules/caesar/components/CaesarModule';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { VigenereModule } from '../modules/vigenere/components/VigenereModule';

interface BaseModuleWrapperProps {
	currentModule: ModuleTypes | null;
}

const BaseModuleWrapper: React.SFC<BaseModuleWrapperProps> = (props: BaseModuleWrapperProps) => {
	const { currentModule } = props;

	switch (currentModule) {
		case ModuleTypes.CEASAR:
			return <CaesarModule />;
		case ModuleTypes.VIGENERE:
			return <VigenereModule />;
		default:
			return null;
	}
};

const ModuleWrapper = wrapWithMobx<BaseModuleWrapperProps>(BaseModuleWrapper, 'ModuleWrapper');

export {
	ModuleWrapper
};