import { EncryptionAlgorithm } from './EncryptionAlgorithm';
import { CeasarCipher } from './CeasarCipher';
import { VisualizerStore } from './VisualizerStore';
import { VisualizerControlStore } from './VisualizerControlStore';

class Globals {
	algorithm: EncryptionAlgorithm;
	visualizerStore: VisualizerStore;
	visualizerControlStore: VisualizerControlStore;

	constructor() {
		const cipher: CeasarCipher = new CeasarCipher();
		this.algorithm = cipher;
		this.visualizerStore = new VisualizerStore({
			ceasarCipher: cipher
		});
		this.visualizerControlStore = new VisualizerControlStore();
	}
}

const cryptoGlobals: Globals = new Globals();

export {
	cryptoGlobals
};