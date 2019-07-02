import { observable, action } from 'mobx';

enum ModuleTypes {
	CEASAR = 'CEASAR',
	VIGENERE = 'VIGENERE'
}

class ModuleStore {

	readonly supportedModules: ModuleTypes[] = [ModuleTypes.CEASAR, ModuleTypes.VIGENERE];

	@observable currentModule: ModuleTypes | null = null;

	@action.bound
	setCurrentModule(module: ModuleTypes): void {
		this.currentModule = module;
	}

}

export {
	ModuleStore,
	ModuleTypes
};