

function assertUninitializedVigenereCipher() {
	return new Error('Un-initialized Vigenere Cipher');
}

function assertUnitializedVigenereVisualizer() {
	return new Error('Un-initialized Vigenere Visualizer');
}

export {
	assertUninitializedVigenereCipher,
	assertUnitializedVigenereVisualizer
};