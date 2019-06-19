import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import styled from 'styled-components';

interface ErrorMessageProps {
	className?: string;
	message: string;
}

const BaseErrorMessage: React.SFC<ErrorMessageProps> = (props: ErrorMessageProps) => {
	const { className, message } = props;

	return <span className={className}>{message}</span>;
};

const StyledBaseErrorMessage = styled(BaseErrorMessage)`
	color: #DC3545;
`;

const ErrorMessage = wrapWithMobx<ErrorMessageProps>(StyledBaseErrorMessage, 'ErrorMessage');

export {
	ErrorMessage
};