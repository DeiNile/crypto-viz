import { GlobalState } from '../../../components/CryptoViz';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { assertUnitializedVigenereVisualizer, assertUninitializedVigenereCipher } from '../utils/assertUnitializer';
import { TableDataProps, Table } from '../../../components/Table';

function stateInjector({ rootStore }: GlobalState): TableDataProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw assertUninitializedVigenereCipher();
	}
	if (rootStore.moduleStore.vigenereVisualizerStore === null) {
		throw assertUnitializedVigenereVisualizer();
	}

	return {
		isVisible: rootStore.moduleStore.vigenereCipher.lastAction !== null,
		table: rootStore.moduleStore.vigenereCipher.vigenereTable,
		horizontalHeader: rootStore.moduleStore.vigenereCipher.vigenereTable[0],
		verticalHeader: rootStore.moduleStore.vigenereCipher.vigenereTable[0],
		highlightedColumn: rootStore.moduleStore.vigenereVisualizerStore.highlightedColumn !== null
			? rootStore.moduleStore.vigenereVisualizerStore.highlightedColumn
			: undefined,
		highlightedRow: rootStore.moduleStore.vigenereVisualizerStore.highlightedRow !== null
			? rootStore.moduleStore.vigenereVisualizerStore.highlightedRow
			: undefined,
		animationSpeed: rootStore.visualizerControlStore.animationSpeedInMs
	};
}

interface StatefulVigenereTableProps {}

const VigenereTable = injectWithState<StatefulVigenereTableProps>(stateInjector, Table, 'VigenereTable');

export {
	VigenereTable
};