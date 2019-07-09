import '../styles/InputField.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { ErrorMessage } from './ErrorMessage';

interface InputFieldProps {
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
		const { showErrors, error,  placeholder } = this.props;

		const canShowError: boolean = showErrors && error !== null && error.length > 0;
		const effectivePlaceholder: string = (placeholder !== undefined)
			? placeholder
			: '';

		return (
			<div className='input-field-with-error'>
				<input className='input-field' onChange={this.onChange} placeholder={effectivePlaceholder} />
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

export {
	InputField
};