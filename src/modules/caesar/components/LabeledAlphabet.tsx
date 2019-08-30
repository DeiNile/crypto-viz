import React from 'react';
import { GlobalState } from '../../../components/CryptoViz';
import { LabeledProps, Labeled } from '../../../components/Labeled';
import { CeasarAlphabet } from './CeasarAlphabet';
import { injectWithState } from '../../../utils/wrapWithMobx';


function stateInjector({ rootStore }: GlobalState): LabeledProps {
	return {
		label: 'Alphabet',
		child: <CeasarAlphabet />
	};
}

interface StatefulLabeledAlphabetProps {}

const LabeledAlphabet = injectWithState<StatefulLabeledAlphabetProps>(stateInjector, Labeled, 'LabeledCeasarAlphabet');

export {
	LabeledAlphabet
};