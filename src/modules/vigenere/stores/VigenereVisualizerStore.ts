import { VigenereCipherStep } from './VigenereCipher';
import { observable, computed, action } from 'mobx';

enum VigenereAnimationType {
	INPUT_HIGHLIGHT = 'INPUT_HIGHLIGHT',
	COLUMN_HIGHLIGHT = 'COLUMN_HIGHLIGHT',
	ROW_HIGHLIGHT = 'ROW_HIGHLIGHT',
	OUTPUT_HIGHLIGHT = 'OUTPUT_HIGHLIGHT'
}

class VigenereVisualizerStore {

	readonly animationStepsInIteration: number = Object.keys(VigenereAnimationType).length;

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
		return this.animationIndex > 0;
	}

	@computed get canPlay(): boolean {
		return this.canStepForward;
	}

	@computed get currentAnimationIndex(): number {
		return Math.floor(this.animationIndex / this.animationStepsInIteration);
	}

	@computed get animationStep(): VigenereAnimationType {
		const animationIndexInStep: number = this.animationIndex % this.animationStepsInIteration;

		if (animationIndexInStep === 0) {
			return VigenereAnimationType.INPUT_HIGHLIGHT;
		}
		else if (animationIndexInStep === 1) {
			return VigenereAnimationType.COLUMN_HIGHLIGHT;
		}
		else if (animationIndexInStep === 2) {
			return VigenereAnimationType.ROW_HIGHLIGHT;
		}
		else {
			return VigenereAnimationType.OUTPUT_HIGHLIGHT;
		}
	}

	@computed get currentStep(): VigenereCipherStep | null {
		return this.hasSteps && this.currentAnimationIndex < this.steps.length
			? this.steps[this.currentAnimationIndex]
			: null;
	}

	@computed get highlightedColumn(): number | null {

		if (this.animationStep !== VigenereAnimationType.INPUT_HIGHLIGHT) {
			return this.steps[this.currentAnimationIndex].inputCharacterIndex;
		}

		return null;
	}

	@computed get highlighterRow(): number | null {

		if (
			this.animationStep !== VigenereAnimationType.INPUT_HIGHLIGHT &&
			this.animationStep !== VigenereAnimationType.COLUMN_HIGHLIGHT
		) {
			return this.steps[this.currentAnimationIndex].keywordCharacterIndex;
		}

		return null;
	}

	@computed get highlightedInputIndex(): number | null {
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
		return null;
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
		this.animationIndex = 0;
	}

	@action.bound
	setIsExplainerExpanded(isExpanded: boolean): void {
		this.isExplainerExpanded = isExpanded;
	}

}

export {
	VigenereVisualizerStore
};