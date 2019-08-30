import '../styles/CeasarAlphabet.scss';
import { TableDataProps, Table } from '../../../components/Table';
import { GlobalState } from '../../../components/CryptoViz';
import { CeasarCipher } from '../stores/CeasarCipher';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { assertUninitializedCeasarCipher, assertUninitializedCeasarCipherVisualizer } from '../../vigenere/utils/assertUnitializer';


function stateInjector({ rootStore }: GlobalState): TableDataProps {

	if (rootStore.moduleStore.ceasarCipher === null) {
		throw assertUninitializedCeasarCipher();
	}

	if (rootStore.moduleStore.ceasarVisualizerStore === null) {
		throw assertUninitializedCeasarCipherVisualizer();
	}

	return {
		isVisible: rootStore.moduleStore.ceasarCipher.lastAction !== null,
		table: [CeasarCipher.alphabet],
		tableClassNameSuffix: 'ceasar-input-alphabet',
		highlightedColumn: rootStore.moduleStore.ceasarVisualizerStore.canShowInputAlphabetHighlight
			? rootStore.moduleStore.ceasarVisualizerStore.highlightedAlphabetIndex
			: undefined
	};
}

interface StatefulCeasarAlphabet {}

const CeasarAlphabet = injectWithState<StatefulCeasarAlphabet>(stateInjector, Table, 'CarsarAlphabet');

export {
	CeasarAlphabet
};