abstract class EncryptionAlgorithm {
	abstract inputText: string | null;
	abstract outputText: string | null;
	abstract isValid: boolean;
	abstract errorMessage: string | null;
	abstract encrypt(): void;
	abstract decrypt(): void;
	abstract setInputText(inputText: string): void;
}

export {
	EncryptionAlgorithm
};