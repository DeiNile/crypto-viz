import '../styles/LabeledText.scss';
import React from 'react';
import classNames from 'classnames';
import { wrapWithMobx } from '../utils/wrapWithMobx';

enum LabelPosition {
	NORTH = 'NORTH',
	WEST = 'WEST'
}

interface LabeledTextProps {
	label: string;
	text: string;
	labelPosition?: LabelPosition;
}

const BaseLabeledText: React.SFC<LabeledTextProps> = (props: LabeledTextProps) => {
	const { label, text, labelPosition } = props;
	const clsName: string = classNames(
		'labeled-text',
		labelPosition === undefined
			? LabelPosition.WEST
			: labelPosition
	);

	return (
		<div className={clsName}>
			<label className='label'>{label}:</label>
			<span className='text'>{text}</span>
		</div>
	);
};

const LabeledText = wrapWithMobx<LabeledTextProps>(BaseLabeledText, 'LabeledText');

export {
	LabeledText,
	LabeledTextProps,
	LabelPosition
};