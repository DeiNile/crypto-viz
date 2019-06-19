import styled, { StyledComponent } from 'styled-components';

/* tslint:disable */
const StyledInput: StyledComponent<'input', any, {}, never> = styled.input`
/* tslint:enable */

height: 1.2rem;
font-size: 0.95rem;
line-height: 1.5;
padding: .1875rem 0.35rem;
border: 1px solid #CED4DA;
border-radius: 0.25rem;

&:focus {
	outline: none;
}
`;

export {
	StyledInput
};