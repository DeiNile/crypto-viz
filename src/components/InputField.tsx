import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { ErrorMessage } from './ErrorMessage';
import styled from 'styled-components';
import { StyledInput } from '../styled-components/StyledInput';
// import { StyledInput } from '../styled-components/StyledInput';

interface InputFieldProps {
	className?: string;
	placeholder?: string;
	showErrors: boolean;
	error: string | null;
	setText(text: string): void;
}


class BaseInputField extends React.Component<InputFieldProps> {

	constructor(props: InputFieldProps) {
		super(props);

		this.onChange = this.onChange.bind(this);
	}

	onChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const { setText } = this.props;

		setText(event.target.value);
	}

	render() {
		const { showErrors, error, className, placeholder } = this.props;

		const canShowError: boolean = showErrors && error !== null && error.length > 0;
		const effectivePlaceholder: string = (placeholder !== undefined)
			? placeholder
			: '';

		return (
			<div className={className}>
				<StyledInput onChange={this.onChange} placeholder={effectivePlaceholder} />
				{
					!canShowError
						? null
						: (
							<ErrorMessage message={`* [${error as string}] are illegal characters`}/>
						)
				}
			</div>
		);
	}
}


const InputField = wrapWithMobx<InputFieldProps>(BaseInputField, 'InputField');

const StyledInputField = styled(InputField)`
	display: flex;
	flex-direction: column;
	margin: 0.25rem 0;

	/* Apply margin to all children */
	* {
		margin: 0.25rem 0;
	}
`;

export {
	InputField,
	StyledInputField
};