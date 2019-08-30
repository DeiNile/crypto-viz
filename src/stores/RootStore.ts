import { VisualizerControlStore } from './VisualizerControlStore';
import { ModuleStore } from './ModuleStore';

class RootStore {
	visualizerControlStore: VisualizerControlStore;
	moduleStore: ModuleStore;

	constructor() {
		this.moduleStore = new ModuleStore(this);
		this.visualizerControlStore = new VisualizerControlStore();
	}
}

export {
	RootStore
};