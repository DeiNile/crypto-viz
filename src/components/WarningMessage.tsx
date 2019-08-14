import '../styles/WarningMessage.scss';
import React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface WarningMessageProps {
	message: string;
}

const BaseWarningMessage: React.SFC<WarningMessageProps> = (props: WarningMessageProps) => {
	const { message } = props;

	return <span className='warning-message'>{message}</span>;
};

const WarningMessage = wrapWithMobx<WarningMessageProps>(BaseWarningMessage, 'WarningMessage');

export {
	WarningMessage
};