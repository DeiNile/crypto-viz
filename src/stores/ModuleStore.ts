import { observable, action } from 'mobx';
import { VigenereCipher, VigenereCipherStep } from '../modules/vigenere/stores/VigenereCipher';
import { VigenereVisualizerStore } from '../modules/vigenere/stores/VigenereVisualizerStore';

enum ModuleTypes {
	CEASAR = 'CEASAR',
	VIGENERE = 'VIGENERE'
}

class ModuleStore {

	readonly supportedModules: ModuleTypes[] = [ModuleTypes.CEASAR, ModuleTypes.VIGENERE];

	@observable currentModule: ModuleTypes | null = null;

	@observable vigenereCipher: VigenereCipher | null = null;
	@observable vigenereVisualizerStore: VigenereVisualizerStore | null = null;
	@observable subscribeToStepChanges: (newSteps: VigenereCipherStep[]) => void = (newSteps: VigenereCipherStep[]) => {
		console.warn('default step subscribed called');
	}

	@action.bound
	setCurrentModule(module: ModuleTypes): void {
		this.currentModule = module;

		if (module === ModuleTypes.VIGENERE) {
			this.vigenereCipher = new VigenereCipher();
			this.vigenereVisualizerStore = new VigenereVisualizerStore();

			this.subscribeToStepChanges = (newSteps: VigenereCipherStep[]) => {
				this.vigenereVisualizerStore!.setSteps(newSteps);
			};
			this.vigenereCipher.setBroadcastStepChange(this.subscribeToStepChanges);

			// Set / pass in some setter method for the steps, to cross-communicate the current state of the visalizer.
		}
	}

}

export {
	ModuleStore,
	ModuleTypes
};