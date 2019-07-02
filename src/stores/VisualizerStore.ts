import { computed, observable, action } from 'mobx';
import { CeasarCipherStep, CeasarCipher } from './CeasarCipher';
import { Point, Dimension } from './Geometry';
import { RootStore } from './RootStore';


interface CeasarComponentPosition {
	position: Point;
	boxSize: Dimension;
}

interface CeasarComponentPositions {
	input: CeasarComponentPosition;
	alphabet: CeasarComponentPosition;
	output: CeasarComponentPosition;
}

enum CeasarAnimationType {
	INPUT = 'INPUT',
	ALPHABET_START = 'ALPHABET_START',
	ALPHABET_END = 'ALPHABET_END',
	OUTPUT = 'OUTPUT'
}

class CeasarVisualizerStore {

	private static readonly defaultFontSize: number = 16;
	private static readonly animationStepsInIteration: number = 4;
	private readonly rootStore: RootStore;

	@observable ceasarCipher: CeasarCipher;
	@observable steps: CeasarCipherStep[] = [];
	@observable private timeout: number | null = null;
	@observable private animationIndex: number = 0;
	@observable isShowingExplanation: boolean = true;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		this.ceasarCipher = rootStore.algorithm as CeasarCipher;
	}

	@computed get isPlaying(): boolean {
		return this.timeout !== null;
	}

	@computed
	get canPlay(): boolean {
		return this.canStepForward;
	}

	@computed
	get canStepForward(): boolean {
		return this.animationIndex < this.totalNumberOfAnimations - 1;
	}

	@computed
	get canStepBackward(): boolean {
		return this.animationIndex > 0;
	}

	@computed
	get totalNumberOfAnimations(): number {
		return this.steps.length * CeasarVisualizerStore.animationStepsInIteration;
	}

	@computed
	get fontSize(): number {

		// The root element of the document should have the canonical font size.
		const documentStyle: CSSStyleDeclaration = getComputedStyle(document.documentElement);

		if (documentStyle.fontSize === null || !documentStyle.fontSize.endsWith('px')) {
			return CeasarVisualizerStore.defaultFontSize;
		}

		const unitStartIndex: number = documentStyle.fontSize.indexOf('px');

		return parseFloat(documentStyle.fontSize.slice(0, unitStartIndex));
	}

	@computed
	get animationStep(): CeasarAnimationType {
		const relativeAnimationIndex: number = this.animationIndex % CeasarVisualizerStore.animationStepsInIteration;

		if (relativeAnimationIndex === 0) {
			return CeasarAnimationType.INPUT;
		}
		else if (relativeAnimationIndex === 1) {
			return CeasarAnimationType.ALPHABET_START;
		}
		else if (relativeAnimationIndex === 2) {
			return CeasarAnimationType.ALPHABET_END;
		}
		else {
			return CeasarAnimationType.OUTPUT;
		}
	}



	@computed
	get currentlyHighlightedText(): string | null {

		const { animationStep, ceasarCipher, relativeAnimationIndex } = this;

		if (this.relativeAnimationIndex < this.steps.length) {
			if (animationStep === CeasarAnimationType.INPUT) {
				return `${this.steps[relativeAnimationIndex].inputTextIndex + 1}`;
			}
			else if (animationStep === CeasarAnimationType.ALPHABET_START) {
				const index = ceasarCipher.steps[relativeAnimationIndex].inputTextAlphabetIndex;

				return CeasarCipher.alphabet[index];
			}
			else if (animationStep === CeasarAnimationType.ALPHABET_END) {
				const index = ceasarCipher.steps[relativeAnimationIndex].inputTextAlphabetIndex;

				return CeasarCipher.alphabet[index];
			}
			else {
				const index = ceasarCipher.steps[relativeAnimationIndex].inputTextAlphabetIndex;

				return CeasarCipher.alphabet[index];
			}
		}

		return null;
	}

	@computed
	get currentStep(): CeasarCipherStep | null {

		return this.relativeAnimationIndex < this.ceasarCipher.steps.length
			? this.ceasarCipher.steps[this.relativeAnimationIndex]
			: null;
	}

	@computed
	get relativeAnimationIndex(): number {
		return Math.floor(this.animationIndex / CeasarVisualizerStore.animationStepsInIteration);
	}

	/*
		Actions
	*/

	@action.bound
	setIsShowingExplanation(isShowing: boolean): void {
		this.isShowingExplanation = isShowing;
	}

	@action.bound
	resetHighlighter(): void {
		this.animationIndex = 0;
	}

	@action.bound
	play(): void {
		if (this.timeout === null) {
			this.stepForward();
			this.timeout = window.setInterval(() => {
				this.stepForward();

				if (!this.canStepForward) {
					this.stop();
				}
			}, this.rootStore.visualizerControlStore.animationDelay);

		}
	}

	@action.bound
	stepForward(): void {
		if (this.canStepForward) {
			this.animationIndex++;
		}
	}

	@action.bound
	stepBackward(): void {
		if (this.canStepBackward) {
			this.animationIndex--;
		}
	}

	@action.bound
	stop(): void {
		if (this.timeout !== null) {
			clearInterval(this.timeout);
			this.timeout= null;
		}
	}

	@action.bound
	setSteps(steps: CeasarCipherStep[]): void {
		this.steps = steps;
	}

	@action.bound
	addStep(step: CeasarCipherStep): void {
		this.steps.push(step);
	}

	@action.bound
	clearSteps(): void {
		this.steps = [];
	}
}

export {
	CeasarVisualizerStore as VisualizerStore,
	CeasarComponentPositions,
	CeasarAnimationType
};