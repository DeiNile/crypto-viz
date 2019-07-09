import '../styles/ErrorMessage.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface ErrorMessageProps {
	message: string;
}

const BaseErrorMessage: React.SFC<ErrorMessageProps> = (props: ErrorMessageProps) => {
	const { message } = props;

	return <span className='error-message'>{message}</span>;
};

const ErrorMessage = wrapWithMobx<ErrorMessageProps>(BaseErrorMessage, 'ErrorMessage');

export {
	ErrorMessage
};