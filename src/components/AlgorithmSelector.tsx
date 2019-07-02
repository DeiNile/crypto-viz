import * as React from 'react';
import { injectWithState } from '../utils/wrapWithMobx';
import { ModuleTypes } from '../stores/ModuleStore';
import { GlobalState } from './CryptoViz';

interface AlgorithmProps {
	algorithms: ModuleTypes[];
	currentAlgorithm: keyof typeof ModuleTypes | null;

	changeAlgorithm(newAlgorithm: ModuleTypes): void;
}

const BaseAlgorithmSelector: React.SFC<AlgorithmProps> = (props: AlgorithmProps) => {
	const { algorithms, currentAlgorithm, changeAlgorithm } = props;

	return (
		<select
			value={`${currentAlgorithm}`}
			onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
				// @ts-ignore: TypeScript does not realize that the value is an enum
				changeAlgorithm(event.target.value);
			}}
		>
			{
				[(<option key='initial-algorithm'></option>)].concat(
					algorithms.map((algorithm, i: number) => <option key={`${algorithm}|${i}`}>{algorithm}</option>)
				)
			}
		</select>
	);
};

function algorithmSelectorStateInjector({rootStore}: GlobalState): AlgorithmProps {
	return {
		algorithms: rootStore.moduleStore.supportedModules,
		currentAlgorithm: rootStore.moduleStore.currentModule,
		changeAlgorithm: rootStore.moduleStore.setCurrentModule
	};
}

interface StatefulAlgorithmProps {}

const AlgorithmSelctor = injectWithState<StatefulAlgorithmProps>(algorithmSelectorStateInjector, BaseAlgorithmSelector, 'AlgorithmSelector');

export {
	AlgorithmSelctor
};