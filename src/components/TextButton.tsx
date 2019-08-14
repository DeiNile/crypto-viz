import '../styles/TextButton.scss';
import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';

interface TextButtonDataProps {
	classNamePrefix: string;
	isEnabled: boolean;
	text: string;
}

interface TextButtonEvents {
	onClick(): void;
}

type TextButtonProps = TextButtonDataProps & TextButtonEvents;

const BaseTextButton: React.SFC<TextButtonProps> = (props: TextButtonProps) => {
	const { classNamePrefix, isEnabled, text, onClick } = props;

	return <button className={`${classNamePrefix} text-button`} disabled={!isEnabled} onClick={onClick}>{text}</button>;
};

const TextButton = wrapWithMobx<TextButtonProps>(BaseTextButton, 'TextButton');

export {
	TextButton,
	BaseTextButton,
	TextButtonProps
};