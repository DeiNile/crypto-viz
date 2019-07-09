import '../styles/TextButton.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface TextButtonDataProps {
	isEnabled: boolean;
	text: string;
}

interface TextButtonEvents {
	onClick(): void;
}

type TextButtonProps = TextButtonDataProps & TextButtonEvents;

const BaseTextButton: React.SFC<TextButtonProps> = (props: TextButtonProps) => {
	const { isEnabled, text, onClick } = props;

	return <button className='text-button' disabled={!isEnabled} onClick={onClick}>{text}</button>;
};

const TextButton = wrapWithMobx<TextButtonProps>(BaseTextButton, 'TextButton');

export {
	TextButton,
	BaseTextButton,
	TextButtonProps
};