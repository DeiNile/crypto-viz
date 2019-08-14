import '../styles/AlignedLabeledText.scss';
import React from 'react';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { GlobalState } from '../../../components/CryptoViz';
import { assertUninitializedVigenereCipher, assertUnitializedVigenereVisualizer } from '../utils/assertUnitializer';
import { safeGet } from '../../../utils/safeget';


function highlightAt(value: string, className: string, i?: number) {
	if (i !== undefined && i < value.length) {
		const highlightedCharacter: string = value.charAt(i);

		return <span>{value.slice(0, i)}<mark className={className}>{highlightedCharacter}</mark>{value.slice(i + 1)}</span>;
	}

	return <span>{value}</span>;
}


interface AlignedLabeledTextProps {
	children?: JSX.Element[];
	isVisible: boolean;
	keyword: string | null;
	inputText: string | null;
	outputText: string | null;
	inputHighlightIndex?: number;
	keywordHighlightIndex?: number;
	outputHighlightIndex?: number;
}

const BaseAlignedLabeledText: React.SFC<AlignedLabeledTextProps> = (props: AlignedLabeledTextProps) => {
	const { keyword, inputText, outputText, isVisible, inputHighlightIndex, keywordHighlightIndex, outputHighlightIndex } = props;

	if (!isVisible || keyword === null || inputText === null || outputText === null) {
		return null;
	}

	return (
		<div className='aligned-labeled-text'>
			<label>input:</label>
			{highlightAt(inputText, 'input-highlight', inputHighlightIndex)}

			<label>keyword:</label>
			{highlightAt(keyword, 'keyword-highlight', keywordHighlightIndex)}

			<label>output:</label>
			{highlightAt(outputText, 'output-highlight', outputHighlightIndex)}
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