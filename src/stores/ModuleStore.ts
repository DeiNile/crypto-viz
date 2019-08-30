import { observable, action } from 'mobx';
import { VigenereCipher, VigenereCipherStep } from '../modules/vigenere/stores/VigenereCipher';
import { VigenereVisualizerStore } from '../modules/vigenere/stores/VigenereVisualizerStore';
import { ACTION_TYPE } from './EncryptionAlgorithm';
import { CeasarCipher } from '../modules/caesar/stores/CeasarCipher';
import { VisualizerStore } from '../modules/caesar/stores/VisualizerStore';
import { RootStore } from './RootStore';

enum ModuleTypes {
	CEASAR = 'CEASAR',
	VIGENERE = 'VIGENERE'
}

class ModuleStore {

	readonly supportedModules: ModuleTypes[] = [ModuleTypes.CEASAR, ModuleTypes.VIGENERE];
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable currentModule: ModuleTypes | null = null;

	@observable ceasarCipher: CeasarCipher | null = null;
	@observable ceasarVisualizerStore: VisualizerStore | null = null;

	@observable vigenereCipher: VigenereCipher | null = null;
	@observable vigenereVisualizerStore: VigenereVisualizerStore | null = null;
	@observable subscribeToStepChanges: (newSteps: VigenereCipherStep[]) => void = (newSteps: VigenereCipherStep[]) => {
		console.warn('default step subscriber called');
	}
	@observable subscribeToActionTypeChanges: (newAction: ACTION_TYPE) => void = (newAction: ACTION_TYPE) => {
		console.warn('default action type subscriber called');
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
			this.subscribeToActionTypeChanges = (newAction: ACTION_TYPE) => {
				this.vigenereVisualizerStore!.setLastActionType(newAction);
			};
			this.vigenereCipher.setBroadcastStepChange(this.subscribeToStepChanges);
			this.vigenereCipher.setBroadcastLastActionChange(this.subscribeToActionTypeChanges);

			// Set / pass in some setter method for the steps, to cross-communicate the current state of the visalizer.
		}
		else if (module === ModuleTypes.CEASAR) {
			this.ceasarCipher = new CeasarCipher(this.rootStore);
			this.ceasarVisualizerStore = new VisualizerStore(this.rootStore);
		}
	}

	@action.bound
	resetAllModules(): void {
		this.ceasarCipher = null;
		this.ceasarVisualizerStore = null;

		this.vigenereCipher = null;
		this.vigenereVisualizerStore = null;
	}

}

export {
	ModuleStore,
	ModuleTypes
};