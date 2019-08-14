import { EncryptionAlgorithm, ACTION_TYPE } from '../../../stores/EncryptionAlgorithm';
import { observable, action, computed } from 'mobx';
import { modulo } from '../../../utils/modulo';
import { RootStore } from '../../../stores/RootStore';


interface CeasarCipherStep {
	inputTextIndex: number;
	inputTextCharacter: string;
	inputTextAlphabetIndex: number;
	inputTextAlphabetCharacter: string;
	outputTextIndex: number;
	outputTextCharacter: string;
	outputTextAlphabetIndex: number;
	outputTextAlphabetCharacter: string;
}

class CeasarCipher extends EncryptionAlgorithm {

	private readonly rootStore: RootStore;
	private static readonly validatorPattern: RegExp = /^[A-Z]+$/;
	private static readonly alphabetStart: number = 65;
	private static readonly alphabetLength: number = 26;
	static readonly alphabet: string[] = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	];

	@observable shiftAmount: number = 5;
	@observable lastAction: ACTION_TYPE | null = null;
	@observable proposedInputText: string = '';
	@observable inputText: string | null = null;
	@observable outputText: string | null = null;
	@observable steps: CeasarCipherStep[] = [];

	constructor(rootStore: RootStore) {
		super();

		this.rootStore = rootStore;
	}

	/**
	 * Computed
	 */

	 @computed
	 get shitedAlphabet(): string[] {
		if (this.lastAction === null) {
			return [];
		}
		else if (this.lastAction === ACTION_TYPE.DECRYPT) {
			return CeasarCipher.alphabet.slice(CeasarCipher.alphabetLength - this.shiftAmount)
				.concat(CeasarCipher.alphabet.slice(0, CeasarCipher.alphabetLength - this.shiftAmount));
		}
		else {
			return CeasarCipher.alphabet.slice(this.shiftAmount, CeasarCipher.alphabetLength)
				.concat(CeasarCipher.alphabet.slice(0, this.shiftAmount));
		}
	 }

	@computed
	get isValid(): boolean {
		return this.proposedInputText !== null && CeasarCipher.validatorPattern.test(this.proposedInputText);
	}

	@computed
	get errorMessage(): string | null {
		if (!this.isValid && this.proposedInputText !== null && this.proposedInputText.length > 0) {

			const uniqueCharacters: Set<string> = new Set();

			for (let i: number = 0; i < this.proposedInputText.length; i++) {
				const character: string = this.proposedInputText.charAt(i);
				if (!CeasarCipher.validatorPattern.test(character) && !uniqueCharacters.has(character)) {
					uniqueCharacters.add(character);
				}
			}

			let invalidCharacters: string = '';
			uniqueCharacters.forEach((uniqueCharacter: string) => {
				invalidCharacters += uniqueCharacter;
			});

			return invalidCharacters;
		}

		return null;
	}

	/*
	* Actions
	*/

	@action.bound
	encrypt(): void {

		if (this.isValid && this.proposedInputText !== null) {
			this.setlastAction(ACTION_TYPE.ENCRYPT);
			this.inputText = this.proposedInputText;
			this.rootStore.visualizerStore.clearSteps();
			this.outputText = '';
			const newSteps: CeasarCipherStep[] = [];

			for (let i = 0; i < this.proposedInputText.length; i++) {
				const alphabetIndex: number = this.proposedInputText.charCodeAt(i) - CeasarCipher.alphabetStart;
				const shiftedIndex: number = alphabetIndex + this.shiftAmount;
				const encryptedAlphabetIndex: number = modulo(shiftedIndex, CeasarCipher.alphabetLength);
				const encryptedCharacter: string = String.fromCharCode(encryptedAlphabetIndex + CeasarCipher.alphabetStart);

				const stepValue: CeasarCipherStep = {
					inputTextIndex: i,
					inputTextCharacter: this.proposedInputText.charAt(i),
					inputTextAlphabetIndex: alphabetIndex,
					inputTextAlphabetCharacter: CeasarCipher.alphabet[alphabetIndex],
					outputTextAlphabetIndex: encryptedAlphabetIndex,
					outputTextAlphabetCharacter: CeasarCipher.alphabet[encryptedAlphabetIndex],
					outputTextIndex: i,
					outputTextCharacter: encryptedCharacter
				};
				this.rootStore.visualizerStore.addStep(stepValue);
				newSteps.push(stepValue);
				this.outputText += encryptedCharacter;
			}

			this.setSteps(newSteps);
		}
	}

	@action.bound
	decrypt(): void {

		if (this.isValid && this.proposedInputText !== null) {
			this.setlastAction(ACTION_TYPE.DECRYPT);
			this.inputText = this.proposedInputText;
			this.rootStore.visualizerStore.clearSteps();
			this.outputText = '';
			const newSteps: CeasarCipherStep[] = [];

			for (let i = 0; i < this.proposedInputText.length; i++) {
				const alphabetIndex: number = this.proposedInputText.charCodeAt(i) - CeasarCipher.alphabetStart;
				const shiftedIndex: number = alphabetIndex - this.shiftAmount;
				const decryptedAlphabetIndex: number = modulo(shiftedIndex, CeasarCipher.alphabetLength);
				const decryptedCharacter: string = String.fromCharCode(decryptedAlphabetIndex + CeasarCipher.alphabetStart);

				const stepValue: CeasarCipherStep = {
					inputTextIndex: i,
					inputTextCharacter: this.proposedInputText.charAt(i),
					inputTextAlphabetIndex: alphabetIndex,
					inputTextAlphabetCharacter: CeasarCipher.alphabet[alphabetIndex],
					outputTextAlphabetIndex: decryptedAlphabetIndex,
					outputTextAlphabetCharacter: CeasarCipher.alphabet[decryptedAlphabetIndex],
					outputTextIndex: i,
					outputTextCharacter: decryptedCharacter
				};
				this.rootStore.visualizerStore.addStep(stepValue);
				newSteps.push(stepValue);
				this.outputText += decryptedCharacter;
			}

			this.setSteps(newSteps);
		}
	}

	/*
	 * Other Methods
	 */
}

export {
	CeasarCipher,
	CeasarCipherStep,
	ACTION_TYPE
};