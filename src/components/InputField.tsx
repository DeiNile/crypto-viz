import '../styles/InputField.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { ErrorMessage } from './ErrorMessage';
import { WarningMessage } from './WarningMessage';

interface InputFieldProps {
	classNamePrefix: string;
	value: string;
	placeholder?: string;
	showErrors: boolean;
	error: string | null;
	warning?: string;
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
		const { classNamePrefix, showErrors, error, warning, placeholder, value } = this.props;

		const canShowError: boolean = showErrors && error !== null && error.length > 0;
		const effectivePlaceholder: string = (placeholder !== undefined)
			? placeholder
			: '';

		return (
			<div className={`${classNamePrefix} input-field-with-error`}>
				<input className='input-field' onChange={this.onChange} placeholder={effectivePlaceholder} value={value} />
				{!canShowError
					? null
					: <ErrorMessage message={`* [${error as string}] are illegal characters`} />
				}
				{!canShowError && warning !== undefined
					? <WarningMessage message={warning} />
					: null
				}
			</div>
		);
	}
}


const InputField = wrapWithMobx<InputFieldProps>(BaseInputField, 'InputField');

export {
	InputField,
	InputFieldProps
};