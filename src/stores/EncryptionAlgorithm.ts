import { action } from 'mobx';

enum ACTION_TYPE {
	ENCRYPT = 'ENCRYPT',
	DECRYPT = 'DECRYPT'
}

abstract class EncryptionAlgorithm {
	abstract lastAction: ACTION_TYPE | null;
	abstract proposedInputText: string | null;
	abstract inputText: string | null;
	abstract outputText: string | null;
	abstract isValid: boolean;
	abstract errorMessage: string | null;
	abstract steps: any[];

	abstract encrypt(): void;
	abstract decrypt(): void;


	@action.bound
	setlastAction(lastAction: ACTION_TYPE): void {
		this.lastAction = lastAction;
	}

	@action.bound
	setInputText(inputText: string): void {
		this.proposedInputText = inputText;
	}

	@action.bound
	protected setSteps(steps: any[]): void {
		this.steps = steps;
	}
}

export {
	EncryptionAlgorithm,
	ACTION_TYPE
};