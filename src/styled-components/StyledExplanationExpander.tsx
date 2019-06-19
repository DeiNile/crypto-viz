import * as React from 'react';
import styled from 'styled-components';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface ExplanationExpanderDataProps {
	className?: string;
	text: string;
}

interface ExplanationExpanderEvents {
	expand(): void;
}

type ExplanationExpanderProps = ExplanationExpanderDataProps & ExplanationExpanderEvents;

const BaseExplanationExpander: React.SFC<ExplanationExpanderProps> = (props: ExplanationExpanderProps) => {

	const { text, className, expand } = props;

	return (
		<div className={`explanation-expander ${className}`} onClick={expand}>
			<div className='chevron' />
			<div className='expander-text'>{text}</div>
		</div>
	);
};

const ExplanationExpander = wrapWithMobx<ExplanationExpanderProps>(BaseExplanationExpander, 'ExplanationExpander');

const StyledExplanationExpander = styled(ExplanationExpander)`

	color: #007BFF;
	border: solid 1px #007BFF;
	background-color: #FFF;
	padding: 0.1875rem 0.25rem;
	height: 100%;

	text-transform: capitalize;

	&:hover {
		cursor: pointer;
	}

	.chevron {
		border-color: #007BFF;
		border-style: solid;
		border-width: 0.25rem 0.25rem 0 0;
		height: 0.45rem;
		position: relative;
		top: 0.15rem;
		width: 0.45rem;
		transform: rotate(225deg);
		margin: 0 auto;
	}

	.expander-text {
		writing-mode: vertical-rl;
		text-orientation: upright;
		padding-top: 0.45rem;
		margin: 0 auto;
	}
`;

export {
	StyledExplanationExpander
};