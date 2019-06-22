import * as React from 'react';
import styled from 'styled-components';
import { wrapWithMobx } from '../../../utils/wrapWithMobx';
import { CeasarAnimationType } from '../../../stores/VisualizerStore';
import { StyledExplanationCollapser } from '../../../styled-components/StyledExplanationCollapser';
import { StyledExplanationExpander } from '../../../styled-components/StyledExplanationExpander';
import { CeasarCipherStep } from '../../../stores/CeasarCipher';


interface CaesarExplanationDatProps {
	className?: string;
	currentStep: CeasarCipherStep;
	animationStep: CeasarAnimationType;
	shiftAmount: number;
	isEncrypting: boolean;
	isShowing: boolean;
	isShowingText: boolean;
}

interface CeasarExplanationEvents {
	setIsShowing(isShowing: boolean): void;
}

type CaesarExplanationProps = CaesarExplanationDatProps & CeasarExplanationEvents;

class BaseCaesarExplanation extends React.Component<CaesarExplanationProps> {

	constructor(props: CaesarExplanationProps) {
		super(props);

		this.collapse = this.collapse.bind(this);
		this.expand = this.expand.bind(this);
	}

	getInputCharacter(characterPosition: number): string {
		const { isEncrypting } = this.props;
		const inputTextType: string = isEncrypting
			? 'plaintext'
			: 'ciphertext';

		return `Find the character at position ${characterPosition} in your ${inputTextType}.`;
	}

	getInputAlphabetCharacter(character: string): string {
		return `Find ${character}'s position in the alphabet.`;
	}

	getOutputAlphabetCharacter(character: string, outputCharacter: string): string {
		const { isEncrypting, shiftAmount } = this.props;
		const direction: string = isEncrypting
			? 'right'
			: 'left';

		const preAmble: string = isEncrypting
			? `If you reach the end of the alphabet before you could perform all of your shifts, start from the beginning of the alphabet. You should end up with ${outputCharacter}.`
			: `If you reach the start of the alphabet before you could perform all of your shifts, start from the end of the alphabet. You should end up with ${outputCharacter}.`;

		return `Shift ${character} ${shiftAmount} positions to the ${direction}. ${preAmble}`;
	}

	getOutputCharacter(shiftedCharacter: string): string {
		const { isEncrypting } = this.props;
		const outputType: string = isEncrypting
			? 'ciphertext'
			: 'plaintext';

		return `Append ${shiftedCharacter} to your ${outputType}.`;
	}

	getCurrentExplanation(): string {
		const { animationStep, currentStep } = this.props;

		if (animationStep === CeasarAnimationType.INPUT) {
			return this.getInputCharacter(currentStep.inputTextIndex + 1);
		}
		else if (animationStep === CeasarAnimationType.ALPHABET_START) {
			return this.getInputAlphabetCharacter(currentStep.inputTextCharacter);
		}
		else if (animationStep === CeasarAnimationType.ALPHABET_END) {
			return this.getOutputAlphabetCharacter(currentStep.inputTextAlphabetCharacter, currentStep.outputTextCharacter);
		}
		else {
			return this.getOutputCharacter(currentStep.outputTextCharacter);
		}
	}

	collapse(): void {
		const { setIsShowing } = this.props;

		setIsShowing(false);
	}

	expand(): void {
		const { setIsShowing } = this.props;

		setIsShowing(true);
	}

	render() {
		const { isShowing, isShowingText, className } = this.props;

		if (isShowing) {
			return (
				<div className={className}>
					<StyledExplanationCollapser text='Hide Walkthrough' collapse={this.collapse} />
					{
						!isShowingText
							? null
							: <div className='explanation'>{ this.getCurrentExplanation() }</div>
					}
				</div>
			);
		}

		return (
			<div className={className}>
				<StyledExplanationExpander text='Show Walkthrough' expand={this.expand} />
			</div>
		);
	}
}

const CaesarExplanation = wrapWithMobx<CaesarExplanationProps>(BaseCaesarExplanation, 'CaesarExplanation');

const StyledCaesarExplanation = styled(CaesarExplanation)`
	background-color: ${(props) => props.isShowing ? '#E9ECEF' : '#FFF'};

	.explanation {
		padding: 0.25rem;
		color: #212529;
		line-height: 1.35rem;
	}
`;

export {
	CaesarExplanation,
	StyledCaesarExplanation
};
