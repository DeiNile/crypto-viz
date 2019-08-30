import { CeasarCipher } from '../modules/caesar/stores/CeasarCipher';
import { VisualizerStore } from '../modules/caesar/stores/VisualizerStore';
import { VisualizerControlStore } from './VisualizerControlStore';
import { ModuleStore } from './ModuleStore';

class RootStore {
	algorithm: CeasarCipher;
	visualizerStore: VisualizerStore;
	visualizerControlStore: VisualizerControlStore;
	moduleStore: ModuleStore;

	constructor() {
		this.moduleStore = new ModuleStore();
		this.algorithm = new CeasarCipher(this);
		this.visualizerStore = new VisualizerStore(this);
		this.visualizerControlStore = new VisualizerControlStore();
	}
}

export {
	RootStore
};