import '../styles/VigenereExplanation.scss';
import React from 'react';
import { ExplanationCollapser } from '../../../components/ExplanationCollapser';
import { ExplanationExpander } from '../../../components/ExplanationExpander';
import { GlobalState } from '../../../components/CryptoViz';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { assertUninitializedVigenereCipher, assertUnitializedVigenereVisualizer } from '../utils/assertUnitializer';

interface VigenereExplanationProps {
	isVisible: boolean;
	isExpanded: boolean;
	explanationText: string;
	expand(): void;
	collapse(): void;
}

const BaseVigenereExplanation: React.SFC<VigenereExplanationProps> = function (props: VigenereExplanationProps) {

	const { isVisible, isExpanded, explanationText, expand, collapse } = props;

	if (!isVisible) {
		return null;
	}
	else if (isExpanded) {
		return (
			<div className='vigenere-explanation'>
				<ExplanationCollapser text='Hide Walkthrough' collapse={collapse} />
				<div className='vigenere-explanation-text'>{explanationText}</div>
			</div>
		);
	}
	else {
		return <ExplanationExpander text='Show Walkthrough' expand={expand} />;
	}
};

function stateInjector({rootStore}: GlobalState): VigenereExplanationProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw assertUninitializedVigenereCipher();
	}
	if (rootStore.moduleStore.vigenereVisualizerStore === null) {
		throw assertUnitializedVigenereVisualizer();
	}

	const visualizerStore = rootStore.moduleStore.vigenereVisualizerStore;

	return {
		isVisible: rootStore.moduleStore.vigenereCipher.hasEncryptedDecrypted,
		isExpanded: visualizerStore.isExplainerExpanded,
		explanationText: visualizerStore.currentText === null
			? ''
			: visualizerStore.currentText,
		collapse: () => visualizerStore.setIsExplainerExpanded(false),
		expand: () => visualizerStore.setIsExplainerExpanded(true)
	};
}

interface StatefulVigenereExplanationProps {}

const VigenereExplanation = injectWithState<StatefulVigenereExplanationProps>(stateInjector, BaseVigenereExplanation, 'VigenereExplantion');

export {
	VigenereExplanation
};