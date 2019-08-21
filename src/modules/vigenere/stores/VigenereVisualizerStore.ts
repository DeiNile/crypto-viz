import { VigenereCipherStep } from './VigenereCipher';
import { observable, computed, action } from 'mobx';
import { ordinalSuffix } from '../utils/ordinalSuffix';
import { ACTION_TYPE } from '../../../stores/EncryptionAlgorithm';

enum VigenereAnimationType {
	PREABMLE = 'PREAMBLE',
	COLUMN_HIGHLIGHT = 'COLUMN_HIGHLIGHT',
	ROW_HIGHLIGHT = 'ROW_HIGHLIGHT',
	OUTPUT_HIGHLIGHT = 'OUTPUT_HIGHLIGHT'
}

class VigenereVisualizerStore {

	readonly animationStepsInIteration: number = Object.keys(VigenereAnimationType).length - 1;

	@observable lastAction: ACTION_TYPE | null = null;
	@observable steps: VigenereCipherStep[] = [];
	@observable timeout: number | null = null;
	@observable animationIndex: number = 0;
	@observable isExplainerExpanded: boolean = false;

	@computed get hasSteps(): boolean {
		return this.steps.length > 0;
	}

	@computed get isPlaying(): boolean {
		return this.timeout !== null;
	}

	@computed get totalNumberOfAnimations(): number {
		return this.steps.length * this.animationStepsInIteration;
	}

	@computed get canStepForward(): boolean {
		return this.animationIndex < this.totalNumberOfAnimations - 1;
	}

	@computed get canStepBackward(): boolean {
		return this.animationIndex > -1;
	}

	@computed get canPlay(): boolean {
		return this.canStepForward;
	}

	@computed get currentAnimationIndex(): number {
		return this.animationIndex === -1
			? -1
			: Math.floor(this.animationIndex / this.animationStepsInIteration);
	}

	@computed get animationStep(): VigenereAnimationType {
		const animationIndexInStep: number = this.animationIndex % this.animationStepsInIteration;

		if (this.animationIndex === -1) {
			return VigenereAnimationType.PREABMLE;
		}
		else if (animationIndexInStep === 0) {
			return VigenereAnimationType.COLUMN_HIGHLIGHT;
		}
		else if (animationIndexInStep === 1) {
			return VigenereAnimationType.ROW_HIGHLIGHT;
		}
		else {
			return VigenereAnimationType.OUTPUT_HIGHLIGHT;
		}
	}

	@computed get currentStep(): VigenereCipherStep | null {
		return this.hasSteps && this.currentAnimationIndex > 0 && this.currentAnimationIndex < this.steps.length
			? this.steps[this.currentAnimationIndex]
			: null;
	}

	@computed get highlightedColumn(): number | null {

		if (this.hasSteps && this.currentAnimationIndex >= 0) {
			return this.steps[this.currentAnimationIndex].inputCharacterIndex;
		}

		return null;
	}

	@computed get highlightedRow(): number | null {

		if (
			this.animationStep === VigenereAnimationType.ROW_HIGHLIGHT ||
			this.animationStep === VigenereAnimationType.OUTPUT_HIGHLIGHT
		) {
			return this.steps[this.currentAnimationIndex].keywordCharacterIndex;
		}

		return null;
	}

	@computed get highlightedInputIndex(): number | null {
		if (this.animationStep === VigenereAnimationType.PREABMLE) {
			return null;
		}

		return this.currentAnimationIndex;
	}

	@computed get highlightedKeywordIndex(): number | null {
		if (
			this.animationStep === VigenereAnimationType.ROW_HIGHLIGHT ||
			this.animationStep === VigenereAnimationType.OUTPUT_HIGHLIGHT
		) {
			return this.currentAnimationIndex;
		}

		return null;
	}

	@computed get highlightedOutputIndex(): number | null {

		if (this.animationStep === VigenereAnimationType.OUTPUT_HIGHLIGHT) {
			return this.currentAnimationIndex;
		}

		return null;
	}

	@computed get currentText(): string | null {

		if (!this.hasSteps || this.lastAction === null) {
			return null;
		}

		if (this.animationStep === VigenereAnimationType.PREABMLE) {
			const mode = this.lastAction === ACTION_TYPE.DECRYPT
				? 'decryption'
				: 'encryption';
			const textType = this.lastAction === ACTION_TYPE.DECRYPT
				? 'plaintext'
				: 'ciphertext';

			return `Before starting the ${mode} process, we must take take the keyword, and repeat it until its length match that of the ${textType}.

Next, we must construct the Vigenere table. The first row of is the same as the alphabet. The next row shifts the alphabet one position to the left such that 'B' is in the first cell and 'A' is the last cell. Repeat this until you have 'Z' as the first cell of a row.`;
		}
		else if (this.animationStep === VigenereAnimationType.COLUMN_HIGHLIGHT) {
			const textType = this.lastAction === ACTION_TYPE.ENCRYPT
				? 'plaintext'
				: 'ciphertext';

			return `Take the ${ordinalSuffix(this.currentAnimationIndex + 1)} character of your ${textType} - ${this.steps[this.currentAnimationIndex].inputCharacter} - and find its column in the Vigenere table.`;
		}
		else if (this.animationStep === VigenereAnimationType.ROW_HIGHLIGHT) {
			return `Take the ${ordinalSuffix(this.currentAnimationIndex + 1)} character of your keyword - ${this.steps[this.currentAnimationIndex].keywordCharacter} - and find its row in the Vigenere table.`;
		}
		else {

			const textType = this.lastAction === ACTION_TYPE.DECRYPT
				? 'plaintext'
				: 'ciphertext';

			return `Take the character where the highlighted row and column meet - ${this.steps[this.currentAnimationIndex].outputCharacter} - and append it to your ${textType}.`;
		}
	}


	/*
		Actions
	*/

	@action.bound
	stepForward(): void {
		if (this.canStepForward) {
			this.animationIndex++;
		}
	}

	@action.bound
	stepBackwards(): void {
		if (this.canStepBackward) {
			this.animationIndex--;
		}
	}

	@action.bound
	play(delay: number): void {
		if (this.timeout === null) {
			this.stepForward();
			this.timeout = window.setInterval(() => {
				this.stepForward();

				if (!this.canStepForward) {
					this.stop();
				}
			}, delay);
		}
	}

	@action.bound
	stop(): void {
		if (this.timeout !== null) {
			clearInterval(this.timeout);
			this.timeout = null;
		}
	}

	@action.bound
	setSteps(steps: VigenereCipherStep[]): void {
		this.steps = steps;
		this.animationIndex = -1;
	}

	@action.bound
	setLastActionType(newAction: ACTION_TYPE): void {
		this.lastAction = newAction;
	}

	@action.bound
	setIsExplainerExpanded(isExpanded: boolean): void {
		this.isExplainerExpanded = isExpanded;
	}

}

export {
	VigenereVisualizerStore
};