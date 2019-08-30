import React from 'react';
import { GlobalState } from '../../../components/CryptoViz';
import { LabeledProps, Labeled } from '../../../components/Labeled';
import { CeasarShiftedAlphabet } from './CeasarShiftedAlphabet';
import { injectWithState } from '../../../utils/wrapWithMobx';

function stateInjector({ rootStore }: GlobalState): LabeledProps {
	return {
		label: 'Shifted Alphabet',
		child: <CeasarShiftedAlphabet />
	};
}

interface StatefulLabeledShiftedAlphabetProps {}

const LabeledShiftedAlphabet = injectWithState<StatefulLabeledShiftedAlphabetProps>(stateInjector, Labeled, 'LabeledShiftedCeasarAlphabet');

export {
	LabeledShiftedAlphabet
};