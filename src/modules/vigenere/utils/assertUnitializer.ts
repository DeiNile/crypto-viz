
function assertUninitializedCeasarCipher() {
	return new Error('Un-initialized Ceasar Cipher');
}

function assertUninitializedCeasarCipherVisualizer() {
	return new Error('Un-unitialized Ceasar Cipher Visualizer');
}

function assertUninitializedVigenereCipher() {
	return new Error('Un-initialized Vigenere Cipher');
}

function assertUnitializedVigenereVisualizer() {
	return new Error('Un-initialized Vigenere Visualizer');
}

export {
	assertUninitializedCeasarCipher,
	assertUninitializedCeasarCipherVisualizer,
	assertUninitializedVigenereCipher,
	assertUnitializedVigenereVisualizer
};