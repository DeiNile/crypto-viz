import '../styles/CeasarShiftedAlphabet.scss';
import { GlobalState } from '../../../components/CryptoViz';
import { TableDataProps, Table } from '../../../components/Table';
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
		table: [rootStore.moduleStore.ceasarCipher.shitedAlphabet],
		tableClassNameSuffix: 'ceasar-shifted-alphabet',
		highlightedColumn: rootStore.moduleStore.ceasarVisualizerStore.canShowOutputAlphabetHighlight
			? rootStore.moduleStore.ceasarVisualizerStore.highlightedAlphabetIndex
			: undefined
	};
}

interface StatefulCaesarShiftedAlphabetProps {}

const CeasarShiftedAlphabet = injectWithState<StatefulCaesarShiftedAlphabetProps>(stateInjector, Table, 'CeasarShiftedAlphabet');

export {
	CeasarShiftedAlphabet
};