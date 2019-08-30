import '../styles/CeasarCipherCanvas.scss';
import * as React from 'react';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { LabeledInputText } from './LabeledInputText';
import { LabeledOutputText } from './LabeledOutputText';
import { LabeledAlphabet } from './LabeledAlphabet';
import { LabeledShiftedAlphabet } from './LabeledShiftedAlphabet';

interface CeasarCipherCanvasProps {
	isVisible: boolean;
}


const BaseCeasarCipherCanvas: React.SFC<CeasarCipherCanvasProps> = function (props: CeasarCipherCanvasProps) {
	const { isVisible } = props;

	if (!isVisible) {
		return null;
	}

	return (
		<div className='ceasar-cipher-canvas'>
			<LabeledInputText />
			<LabeledAlphabet />
			<LabeledShiftedAlphabet />
			<LabeledOutputText />
		</div>
	);
};

type InjectedCaesarCipherCanvasProps = CeasarCipherCanvasProps;
interface StatefulCaesarCipherCanvasProps {}

function stateInjector({rootStore}: GlobalState): InjectedCaesarCipherCanvasProps {
	return {
		isVisible: rootStore.algorithm.hasEncryptedDecrypted
	};
}

const CeasarCipherCanvas = injectWithState<StatefulCaesarCipherCanvasProps>(stateInjector, BaseCeasarCipherCanvas, 'CeasarCipherCanvas');

export {
	CeasarCipherCanvas
};