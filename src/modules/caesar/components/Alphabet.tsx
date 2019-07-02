import { BoxedCharacterLineProps, BoxedCharacterLine } from '../../../components/BoxedCharacterLine';
import { CeasarCipher } from '../../../stores/CeasarCipher';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';

type AlphabetProps = Pick<BoxedCharacterLineProps, 'characters' | 'fontSize' | 'boxSize'>;
type StatefulALphabetProps = Omit<BoxedCharacterLineProps, keyof AlphabetProps>;

function stateInjector({rootStore}: GlobalState): AlphabetProps {
	return {
		fontSize: rootStore.visualizerStore.fontSize,
		characters: CeasarCipher.alphabet,
		boxSize: {
			width: rootStore.visualizerStore.fontSize * 1.1,
			height: rootStore.visualizerStore.fontSize * 1.1
		}
	};
}

const Alphabet = injectWithState<StatefulALphabetProps>(stateInjector, BoxedCharacterLine, 'Alphabet');

export {
	Alphabet
};