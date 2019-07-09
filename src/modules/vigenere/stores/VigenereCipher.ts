import { observable, computed, action } from 'mobx';
import { EncryptionAlgorithm, ACTION_TYPE } from '../../../stores/EncryptionAlgorithm';
import { modulo } from '../../../utils/modulo';

// interface VigenereCipherStep {
// 	inputCharacter: string;
// 	inputCharacterIndex: number;
// 	keywordCharacter: string;
// 	keywordCharacterIndex: number;
// 	outputCharacter: string;
// 	outputCharacterIndex: number;
// }

class VigenereCipher extends EncryptionAlgorithm {

	private readonly validatorPattern: RegExp = /^[A-Z]+$/;
	readonly alphabetStart: number = 65;
	readonly alphabetLength: number = 26;
	readonly vigenereTable: string[][] = ((): string[][] => {
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

	@observable lastAction: ACTION_TYPE | null = null;
	@observable proposedInputText: string | null = null;
	@observable inputText: string | null = null;
	@observable outputText: string | null = null;
	@observable keyword: string | null = null;
	@observable steps: any[]= [];

	/*
		Computed values
	*/

	@computed get isValid(): boolean {
		return this.inputText !== null &&
			this.keyword !== null &&
			this.validatorPattern.test(this.inputText) &&
			this.validatorPattern.test(this.keyword);
	}

	@computed get errorMessage(): string | null {
		return null;
	}

	@computed get repeatedKeyword(): string | null {

		if (this.keyword !== null && this.inputText !== null) {
			const inputTextLength: number = this.inputText.length;
			if (this.keyword.length < inputTextLength) {
				return this.keyword.slice(0, inputTextLength);
			}
			else {
				let repeatedKeyword: string = '';
				while (repeatedKeyword.length < inputTextLength) {
					const lengthDifference: number = inputTextLength - repeatedKeyword.length;
					repeatedKeyword += lengthDifference > inputTextLength
						? this.inputText.slice(0)
						: this.inputText.slice(0, lengthDifference);
				}

				return repeatedKeyword;
			}
		}

		return null;
	}

	/*
		Actions
	*/

	@action.bound
	setKeyword(keyword: string): void {
		this.keyword = keyword;
	}

	@action.bound
	encrypt(): void {
		// if (this.isValid && this.proposedInputText !== null && this.repeatedKeyword !== null) {

		// 	this.setlastAction(ACTION_TYPE.ENCRYPT);
		// 	this.inputText = this.proposedInputText;
		// 	this.outputText = '';
		// 	// const newSteps: VigenereCipherStep[] = [];

		// 	for (let i = 0; i < this.inputText.length; i++) {
		// 		const inputTextIndex = this.inputText.charCodeAt(i) - this.alphabetStart;
		// 		const keywordIndex = this.repeatedKeyword.charCodeAt(i) - this.alphabetStart;
		// 		// const encryptedCharacter = this.vigenereTable[keywordIndex][inputTextIndex];
		// 		// const encryptedChar = modulo(inputTextIndex + keywordIndex, this.alphabetLength);
		// 	}
		// }
	}

	@action.bound
	decrypt(): void {

	}
}

export {
	VigenereCipher
};