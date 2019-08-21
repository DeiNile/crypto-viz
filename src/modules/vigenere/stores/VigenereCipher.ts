import { observable, computed, action } from 'mobx';
import { ACTION_TYPE } from '../../../stores/EncryptionAlgorithm';
import { modulo } from '../../../utils/modulo';
import { safeGet } from '../../../utils/safeget';

interface VigenereCipherStep {
	inputCharacter: string;
	inputCharacterIndex: number;
	keywordCharacter: string;
	keywordCharacterIndex: number;
	outputCharacter: string;
	outputCharacterIndex: number;
}

class VigenereCipher {

	private readonly validatorPattern: RegExp = /^[A-Z]+$/;
	private readonly alphabeticCharactersPattern: RegExp = /[a-zA-Z]/g;
	readonly alphabetStart: number = 65;
	readonly alphabetLength: number = 26;
	readonly vigenereTable: string[][] = (function (): string[][] {
		const alphabet = [
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
			'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];
		const table: string[][] = [];
		for (let rowIndex = 0; rowIndex < alphabet.length; rowIndex++) {
			const row: string[] = [];
			for (let i = 0; i < alphabet.length; i++) {
				row.push(alphabet[modulo(rowIndex + i, alphabet.length)]);
			}
			table.push(row);
		}

		return table;
	})();

	@observable broadcastStepChange:(steps: VigenereCipherStep[]) => void = () => {
		console.warn('Default step broadcaster called');
	}
	@observable broadcastLastActionChange: (action: ACTION_TYPE) => void = () => {
		console.log('Default last action broadcaster called');
	}

	@observable lastAction: ACTION_TYPE | null = null;
	@observable proposedInputText: string = '';
	@observable proposedKeyword: string = '';
	@observable inputText: string = '';
	@observable outputText: string | null = null;
	@observable keyword: string = '';
	@observable steps: VigenereCipherStep[]= [];

	@observable row: number = 1;
	@observable column: number = 3;

	/*
		Computed values
	*/

	@computed get hasEncryptedDecrypted(): boolean {
		return this.lastAction !== null;
	}

	@computed get isValid(): boolean {
		return this.isValidInputText && this.isValidKeyword;
	}

	@computed get isValidInputText(): boolean {
		return this.proposedInputText !== null && this.validatorPattern.test(this.proposedInputText);
	}

	@computed get isValidKeyword(): boolean {
		return this.proposedKeyword !== null && this.validatorPattern.test(this.proposedKeyword);
	}

	@computed get errorMessage(): string | null {
		return null;
	}

	@computed get inputTextIllegalCharacters(): string | null {

		return !this.isValidInputText && this.proposedInputText !== null
			? this.getIllegalCharacters(this.proposedInputText)
			: null;
	}

	@computed get keywordIllegalCharacters(): string | null {
		return !this.isValidKeyword && this.proposedKeyword !== null
			? this.getIllegalCharacters(this.proposedKeyword)
			: null;
	}

	@computed get keywordLengthWarning(): string | null {
		const exceedsInputLength: boolean = safeGet<boolean, boolean>(
			() => this.proposedKeyword!.length > this.proposedInputText!.length,
			false
		);

		if (exceedsInputLength && this.proposedKeyword !== null) {
			return `${this.proposedKeyword} is longer in length than your Plaintext/Ciphertext. Your keywork will be truncated.`;
		}
		else {
			return null;
		}
	}

	@computed get repeatedKeyword(): string | null {

		if (this.keyword !== null && this.inputText !== null) {
			const inputTextLength: number = this.inputText.length;
			let repeatedKeyword: string = '';
			while (repeatedKeyword.length < inputTextLength) {
				const lengthDifference: number = inputTextLength - repeatedKeyword.length;
				repeatedKeyword += lengthDifference > inputTextLength
					? this.keyword.slice(0)
					: this.keyword.slice(0, lengthDifference);
			}

			return repeatedKeyword;
		}

		return null;
	}

	/*
		Actions
	*/

	@action.bound
	setInputText(inputText: string): void {
		const matchedAlphabeticalCharacters = inputText.match(this.alphabeticCharactersPattern);
		if (matchedAlphabeticalCharacters !== null) {
			this.proposedInputText = matchedAlphabeticalCharacters.join('')
				.toLocaleUpperCase();
		}
		else if (inputText === '') {
			this.proposedInputText = inputText;
		}
	}

	@action.bound
	setKeyword(keyword: string): void {
		const matchedAlphabeticalCharacters = keyword.match(this.alphabeticCharactersPattern);
		if (matchedAlphabeticalCharacters !== null) {
			this.proposedKeyword = matchedAlphabeticalCharacters.join('')
				.toLocaleUpperCase();
		}
		else if (keyword === '') {
			this.proposedKeyword = keyword;
		}
	}

	@action.bound
	encrypt(): void {
		if (this.isValid && this.proposedInputText !== null && this.proposedKeyword !== null) {

			const lastAction: ACTION_TYPE = ACTION_TYPE.ENCRYPT;
			this.setlastAction(lastAction);
			this.inputText = this.proposedInputText;
			this.keyword = this.proposedKeyword;
			const newSteps: VigenereCipherStep[] = [];

			for (let i = 0; i < this.inputText.length; i++) {
				const inputTextIndex = this.inputText.charCodeAt(i) - this.alphabetStart;
				const keywordIndex = this.repeatedKeyword!.charCodeAt(i) - this.alphabetStart;
				const encryptedCharacterIndex: number = (inputTextIndex + keywordIndex) % this.alphabetLength;
				const encrypterCharacter: string = this.vigenereTable[0][encryptedCharacterIndex];


				newSteps.push({
					inputCharacterIndex: inputTextIndex,
					inputCharacter: this.inputText.charAt(i),
					keywordCharacterIndex: keywordIndex,
					keywordCharacter: this.repeatedKeyword!.charAt(i),
					outputCharacterIndex: i,
					outputCharacter: encrypterCharacter
				});
			}

			this.outputText = newSteps
				.map((step: VigenereCipherStep) => step.outputCharacter)
				.join('');
			this.setSteps(newSteps);

			this.broadcastStepChange(this.steps);
			this.broadcastLastActionChange(lastAction);
		}
	}

	@action.bound
	decrypt(): void {
		if (this.isValid && this.proposedInputText !== null && this.proposedKeyword !== null) {
			const lastAction: ACTION_TYPE = ACTION_TYPE.DECRYPT;
			this.setlastAction(lastAction);
			this.inputText = this.proposedInputText;
			this.keyword = this.proposedKeyword;
			const newSteps: VigenereCipherStep[] = [];

			for (let i = 0; i < this.inputText.length; i++) {
				const inputTextIndex: number = this.inputText.charCodeAt(i) - this.alphabetStart;
				const keywordIndex: number = this.repeatedKeyword!.charCodeAt(i) - this.alphabetStart;
				const decryptedCharacterIndex: number = (inputTextIndex - keywordIndex + this.alphabetLength) %
					this.alphabetLength;
				const decryptedCharacter: string = this.vigenereTable[0][decryptedCharacterIndex];

				newSteps.push({
					inputCharacterIndex: inputTextIndex,
					inputCharacter: this.inputText.charAt(i),
					keywordCharacterIndex: keywordIndex,
					keywordCharacter: this.repeatedKeyword!.charAt(i),
					outputCharacterIndex: i,
					outputCharacter: decryptedCharacter
				});

				this.outputText = newSteps
					.map((step: VigenereCipherStep) => step.outputCharacter)
					.join('');
					this.setSteps(newSteps);

					this.broadcastStepChange(this.steps);
					this.broadcastLastActionChange(lastAction);
				}
		}
	}

	@action.bound
	setBroadcastStepChange(newBroadcaster: (steps: VigenereCipherStep[]) => void): void {
		this.broadcastStepChange = newBroadcaster;
	}

	@action.bound
	setBroadcastLastActionChange(newBroadcaster: (newAction: ACTION_TYPE) => void): void {
		this.broadcastLastActionChange = newBroadcaster;
	}

	@action.bound
	setlastAction(lastAction: ACTION_TYPE): void {
		this.lastAction = lastAction;
	}

	@action.bound
	protected setSteps(steps: any[]): void {
		this.steps = steps;
	}

	/*
		Helper methods
	*/

	getIllegalCharacters(str: string): string | null {

		if (str !== null && str.length > 0) {
			const uniqueCharacters: Set<string> = new Set<string>();

			for (let i = 0; i < str.length; i++) {
				const character: string = str.charAt(i);

				if (!this.validatorPattern.test(character) && !uniqueCharacters.has(character)) {
					uniqueCharacters.add(character);
				}
			}

			let invalidCharacters: string = '';
			uniqueCharacters.forEach((character: string) => {
				invalidCharacters += character;
			});

			return invalidCharacters;
		}

		return null;
	}
}

export {
	VigenereCipher,
	VigenereCipherStep
};