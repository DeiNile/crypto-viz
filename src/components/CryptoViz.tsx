import * as React from 'react';
import { Header } from './Header';
import { InputPanel } from './InputPanel';
import { StyledVisualizer } from './Visualizer';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface CryptoVizProps {
}


const BaseCryptoViz: React.SFC<CryptoVizProps> = (props: CryptoVizProps) => {

	return (
		<div>
			<Header />
			<InputPanel />
			<StyledVisualizer />
		</div>
	);
};

const CryptoViz = wrapWithMobx<CryptoVizProps>(BaseCryptoViz, 'CryptoViz');

export {
	CryptoViz
};