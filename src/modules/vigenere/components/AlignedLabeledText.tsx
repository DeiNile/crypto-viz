import '../styles/AlignedLabeledText.scss';
import React from 'react';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { assertUninitializedVigenereCipher, assertUnitializedVigenereVisualizer } from '../utils/assertUnitializer';
import { safeGet } from '../../../utils/safeget';
import { ACTION_TYPE } from '../../caesar/stores/CeasarCipher';
import { highlightCharacterAt } from '../../../utils/highlightCharacterAt';


interface AlignedLabeledTextProps {
	children?: JSX.Element[];
	isVisible: boolean;
	keyword: string | null;
	inputText: string | null;
	outputText: string | null;
	cipherMode: ACTION_TYPE | null;
	inputHighlightIndex?: number;
	keywordHighlightIndex?: number;
	outputHighlightIndex?: number;
}

const BaseAlignedLabeledText: React.SFC<AlignedLabeledTextProps> = (props: AlignedLabeledTextProps) => {
	const { keyword, inputText, outputText, isVisible, inputHighlightIndex, keywordHighlightIndex, outputHighlightIndex, cipherMode } = props;

	if (!isVisible || keyword === null || inputText === null || outputText === null || cipherMode === null) {
		return null;
	}

	const inputDisplayName: string = cipherMode === ACTION_TYPE.ENCRYPT
		? 'Plaintext'
		: 'Ciphertext';
	const outputDisplayName: string = cipherMode === ACTION_TYPE.ENCRYPT
		? 'Ciphertext'
		: 'Plaintext';

	return (
		<div className='aligned-labeled-text'>
			<label>{inputDisplayName}:</label>
			{highlightCharacterAt(inputText, 'input-highlight', inputHighlightIndex)}

			<label>Keyword:</label>
			{highlightCharacterAt(keyword, 'keyword-highlight', keywordHighlightIndex)}

			<label>{outputDisplayName}:</label>
			{highlightCharacterAt(outputText, 'output-highlight', outputHighlightIndex)}
		</div>
	);
};

function stateInjector({rootStore}: GlobalState): AlignedLabeledTextProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw assertUninitializedVigenereCipher();
	}
	if (rootStore.moduleStore.vigenereVisualizerStore === null) {
		throw assertUnitializedVigenereVisualizer();
	}

	return {
		isVisible: rootStore.moduleStore.vigenereCipher.inputText !== null &&
			rootStore.moduleStore.vigenereCipher.repeatedKeyword !== null &&
			rootStore.moduleStore.vigenereCipher.outputText !== null,
		inputText: rootStore.moduleStore.vigenereCipher.inputText,
		keyword: rootStore.moduleStore.vigenereCipher.repeatedKeyword,
		outputText: rootStore.moduleStore.vigenereCipher.outputText,
		cipherMode: rootStore.moduleStore.vigenereCipher.lastAction,
		inputHighlightIndex: safeGet<number, undefined>(
			() => rootStore.moduleStore.vigenereVisualizerStore!.highlightedInputIndex!, undefined, true
		),
		keywordHighlightIndex: safeGet<number, undefined>(
			() => rootStore.moduleStore.vigenereVisualizerStore!.highlightedKeywordIndex!, undefined, true
		),
		outputHighlightIndex: safeGet<number, undefined>(
			() => rootStore.moduleStore.vigenereVisualizerStore!.highlightedOutputIndex!, undefined, true
		)
	};
}

interface StatefulAlignedLabeledText {}

const AlignedLabeledText = injectWithState<StatefulAlignedLabeledText>(stateInjector, BaseAlignedLabeledText, 'AlignedLabeledText');

export {
	AlignedLabeledText
};