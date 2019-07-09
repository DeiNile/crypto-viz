import '../styles/ExplanationExpander.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface ExplanationExpanderDataProps {
	text: string;
}

interface ExplanationExpanderEvents {
	expand(): void;
}

type ExplanationExpanderProps = ExplanationExpanderDataProps & ExplanationExpanderEvents;

const BaseExplanationExpander: React.SFC<ExplanationExpanderProps> = (props: ExplanationExpanderProps) => {

	const { text, expand } = props;

	return (
		<div className='explanation-expander' onClick={expand}>
			<div className='chevron' />
			<div className='expander-text'>{text}</div>
		</div>
	);
};

const ExplanationExpander = wrapWithMobx<ExplanationExpanderProps>(BaseExplanationExpander, 'ExplanationExpander');

export {
	ExplanationExpander
};