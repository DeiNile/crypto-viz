import * as React from 'react';
import { Header } from './Header';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { AlgorithmSelctor } from './AlgorithmSelector';
import { RootStore } from '../stores/RootStore';
import { ModuleWrapper } from './Module';
import { Provider } from 'mobx-react';

interface GlobalState {
	rootStore: RootStore;
}

interface CryptoVizProps {
}

const rootStore = new RootStore();
// @ts-ignore Adding the global state to the window for debugging
window.rootStore = rootStore;

const BaseCryptoViz: React.SFC<CryptoVizProps> = (props: CryptoVizProps) => {

	return (
		<div>
			<Provider rootStore={rootStore}>
				<div>
					<Header />
					<AlgorithmSelctor />
					<ModuleWrapper currentModule={rootStore.moduleStore.currentModule} />
				</div>
			</Provider>
		</div>
	);
};

const CryptoViz = wrapWithMobx<CryptoVizProps>(BaseCryptoViz, 'CryptoViz');

export {
	CryptoViz,
	GlobalState
};