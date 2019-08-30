import '../styles/Labeled.scss';
import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';

interface LabeledProps {
	label: string;
	child: JSX.Element;
	isAbove?: boolean;
}

const BaseLabeled: React.SFC<LabeledProps> = function (props: LabeledProps) {

	const { label, child, isAbove } = props;
	const className: string = classNames(
		'labeled-element',
		{'is-horizontal': isAbove === false}
	);

	return (
		<div className={className}>
			<span className='the-label'>{label}:</span>
			{child}
		</div>
	);
};

const Labeled = observer(BaseLabeled);

export {
	Labeled,
	LabeledProps
};