import '../styles/SvgText.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface BaseSvgTextProps {
	text: string;
	x: number;
	y: number;
}

type SvgTextProps = BaseSvgTextProps;

const BaseSvgText: React.SFC<SvgTextProps> = (props: SvgTextProps) => {
	const { text, x, y } = props;

	return <text className='svg-text' transform={`translate(${x}, ${y})`} >{text}</text>;
};

const SvgText = wrapWithMobx<SvgTextProps>(BaseSvgText, 'SvgText');


export {
	SvgTextProps,
	SvgText
};