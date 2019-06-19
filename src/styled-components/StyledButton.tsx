import styled from 'styled-components';

const color: string = '#007BFF';

const StyledButton = styled.button`

	color: ${color};
	border-color: ${color};
	background-color: #FFF;
	font-weight: 400;
	font-size: 0.75rem;
	text-align: center;
	vertical-align: middle;
	padding: 0.1875rem 0.5rem;
	line-height: 1.5;
	border-radius: 0.25rem;

	&:hover {
		cursor: pointer;

		color: #FFF;
		background-color: ${color};
	}

	&:disabled {
		opacity: 0.2;
		cursor: default;

		color: ${color};
		border-color: ${color};
		background-color: #FFF;
	}

	&:focus {
		outline: none;
	}
`;

export {
	StyledButton
};