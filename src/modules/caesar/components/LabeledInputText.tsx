import '../styles/LabeledInputText.scss';
import React from 'react';
import { LabeledProps, Labeled } from '../../../components/Labeled';
import { GlobalState } from '../../../components/CryptoViz';
import { ACTION_TYPE } from '../stores/CeasarCipher';
import { highlightCharacterAt } from '../../../utils/highlightCharacterAt';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { assertUninitializedCeasarCipher, assertUninitializedCeasarCipherVisualizer } from '../../vigenere/utils/assertUnitializer';


function stateInjector({ rootStore }: GlobalState): LabeledProps {

	if (rootStore.moduleStore.ceasarCipher === null) {
		throw assertUninitializedCeasarCipher();
	}

	if (rootStore.moduleStore.ceasarVisualizerStore === null) {
		throw assertUninitializedCeasarCipherVisualizer();
	}

	return {
		label: rootStore.moduleStore.ceasarCipher.lastAction === ACTION_TYPE.ENCRYPT
			? 'Plaintext'
			: 'Ciphertext',
		child: rootStore.moduleStore.ceasarCipher.inputText !== null
			? highlightCharacterAt(
				rootStore.moduleStore.ceasarCipher.inputText,
				'ceasar-input-text-highlight',
				rootStore.moduleStore.ceasarVisualizerStore.relativeAnimationIndex
			)
			: <span />
	};
}

interface StatefulLabeledInputTextProps {}

const LabeledInputText = injectWithState<StatefulLabeledInputTextProps>(stateInjector, Labeled, 'CeasarCipherLabeledInputText');

export {
	LabeledInputText
};