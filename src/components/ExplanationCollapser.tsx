import '../styles/ExplanationCollapser.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface StyledExplanationCollapserDataProps {
	text: string;
}

interface StyledExplanationCollapserEvents {
	collapse(): void;
}

type StyledExplanationCollapserProps = StyledExplanationCollapserDataProps & StyledExplanationCollapserEvents;

const BaseExplanationCollapser: React.SFC<StyledExplanationCollapserProps> = (props: StyledExplanationCollapserProps) => {

	const { text, collapse } = props;

	return (
		<div className='explanation-collapser' onClick={collapse}>
			<div className='collapser-text'>{text}</div>
			<div className='chevron' />
		</div>
	);
};

const ExplanationCollapser = wrapWithMobx<StyledExplanationCollapserProps>(BaseExplanationCollapser, 'ExplanationCollapser');

export {
	ExplanationCollapser
};