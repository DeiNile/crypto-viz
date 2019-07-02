import { BoxedCharacterLineProps, BoxedCharacterLine } from '../../../components/BoxedCharacterLine';
import { CeasarCipher } from '../../../stores/CeasarCipher';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';

type ShiftedAlphabetProps = Pick<BoxedCharacterLineProps, 'characters' | 'fontSize' | 'boxSize'>;
type StatefulShiftedAlphabetProps = Omit<BoxedCharacterLineProps, keyof ShiftedAlphabetProps>;

function stateInjector({rootStore}: GlobalState): ShiftedAlphabetProps {
	return {
		fontSize: rootStore.visualizerStore.fontSize,
		characters: (rootStore.algorithm as CeasarCipher).shitedAlphabet,
		boxSize: {
			width: rootStore.visualizerStore.fontSize * 1.1,
			height: rootStore.visualizerStore.fontSize * 1.1
		}
	};
}

const ShiftedAlphabet = injectWithState<StatefulShiftedAlphabetProps>(stateInjector, BoxedCharacterLine, 'ShiftedAlphabet');

export {
	ShiftedAlphabet
};