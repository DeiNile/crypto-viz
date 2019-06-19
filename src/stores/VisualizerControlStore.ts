import { observable, action, computed } from 'mobx';

enum VisualizerSpeed {
	SLOWEST = 'SLOWEST',
	SLOWER = 'SLOWER',
	SLOW = 'SLOW',
	NORMAL = 'NORMAL',
	FAST = 'FAST',
	FASTER = 'FASTER',
	INSTANT = 'INSTANT'
}

class VisualizerControlStore {

	private static readonly defaultSpeed: number = 1000;
	@observable animationSpeed: VisualizerSpeed = VisualizerSpeed.NORMAL;

	@computed get animationSpeedInMs(): number {
		switch (this.animationSpeed) {
			case VisualizerSpeed.SLOWEST:
				return VisualizerControlStore.defaultSpeed * 4;
			case VisualizerSpeed.SLOWER:
				return VisualizerControlStore.defaultSpeed * 2;
			case VisualizerSpeed.SLOW:
				return VisualizerControlStore.defaultSpeed * 1.5;
			case VisualizerSpeed.NORMAL:
				return VisualizerControlStore.defaultSpeed;
			case VisualizerSpeed.FAST:
				return VisualizerControlStore.defaultSpeed / 2;
			case VisualizerSpeed.FASTER:
				return VisualizerControlStore.defaultSpeed / 4;
			case VisualizerSpeed.INSTANT:
				return 0;
			default:
				return VisualizerControlStore.defaultSpeed;
		}
	}

	@computed get animationDelay(): number {
		return this.animationSpeedInMs + this.animationSpeedInMs / 15;
	}

	@computed get availableSpeeds(): VisualizerSpeed[] {
		const speeds: VisualizerSpeed[] = [];
		for (const speed in VisualizerSpeed) {
			speeds.push(speed as VisualizerSpeed);
		}

		return speeds;
	}

	@action.bound
	setAnimationSpeed(animationSpeed: VisualizerSpeed): void {
		this.animationSpeed = animationSpeed;
	}
}

export {
	VisualizerControlStore,
	VisualizerSpeed
};