import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import styled from 'styled-components';

interface BaseSvgTextProps {
	className?: string;

	text: string;
	x: number;
	y: number;
}

type SvgTextProps = BaseSvgTextProps;

const BaseSvgText: React.SFC<SvgTextProps> = (props: SvgTextProps) => {
	const { text, x, y, className } = props;

	return <text className={className} transform={`translate(${x}, ${y})`} >{text}</text>;
};

const SvgText = wrapWithMobx<SvgTextProps>(BaseSvgText, 'SvgText');

const StyledSvgText = styled(SvgText)`
	dominant-baseline: hanging;
`;

export {
	SvgTextProps,
	SvgText,
	StyledSvgText
};