import * as React from 'react';
import styled from 'styled-components';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface StyledExplanationCollapserDataProps {
	className?: string;
	text: string;
}

interface StyledExplanationCollapserEvents {
	collapse(): void;
}

type StyledExplanationCollapserProps = StyledExplanationCollapserDataProps & StyledExplanationCollapserEvents;

const BaseExplanationCollapser: React.SFC<StyledExplanationCollapserProps> = (props: StyledExplanationCollapserProps) => {

	const { className, text, collapse } = props;

	return (
		<div className={`explanation-collapser ${className}`} onClick={collapse}>
			<div className='collapser-text'>{text}</div>
			<div className='chevron' />
		</div>
	);
};

const ExplanationCollapser = wrapWithMobx<StyledExplanationCollapserProps>(BaseExplanationCollapser, 'ExplanationCollapser');

const StyledExplanationCollapser = styled(ExplanationCollapser)`

	display: flex;
	flex-direction: row;
	justify-content: space-between;

	color: #007BFF;
	border: solid 1px #007BFF;
	background-color: #FFF;
	padding: 0.1875rem 0.25rem;

	text-transform: capitalize;
	text-align: center;
	vertical-align: middle;

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
		vertical-align: top;
		width: 0.45rem;
		transform: rotate(45deg);
	}
`;

export {
	StyledExplanationCollapser
};