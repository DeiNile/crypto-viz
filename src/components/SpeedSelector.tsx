import * as React from 'react';
import { injectWithState } from '../utils/wrapWithMobx';
import { VisualizerSpeed } from '../stores/VisualizerControlStore';
import { GlobalState } from './CryptoViz';

interface SpeedSelectorDataProps {
	currentSpeed: VisualizerSpeed;
	availableSpeeds: VisualizerSpeed[];
	isEnabled?: boolean;
}

interface SpeedSelectorEvents {
	changeSpeed(newSpeed: VisualizerSpeed): void;
}

type SpeedSelectorProps = SpeedSelectorDataProps & SpeedSelectorEvents;

class BaseSpeedSlector extends React.Component<SpeedSelectorProps> {

	render() {
		const { currentSpeed, availableSpeeds, changeSpeed, isEnabled = true } = this.props;

		return (
			<select
				value={currentSpeed}
				disabled={!isEnabled}
				onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
					// @ts-ignore value is a string, but being assigned to an enum
					changeSpeed(event.target.value);
				}}
			>
				{
					availableSpeeds.map((speed: VisualizerSpeed, i: number) => <option key={`${speed}|${i}`} >{speed}</option>)
				}
			</select>
		);
	}
}

function stateInjector({rootStore}: GlobalState): SpeedSelectorProps {
	return {
		currentSpeed: rootStore.visualizerControlStore.animationSpeed,
		availableSpeeds: rootStore.visualizerControlStore.availableSpeeds,
		changeSpeed: rootStore.visualizerControlStore.setAnimationSpeed
	};
}

interface StatefulSpeedSelectorProps {
	isEnabled: boolean;
}

const SpeedSelector = injectWithState<StatefulSpeedSelectorProps>(stateInjector, BaseSpeedSlector, 'SpeedSelector');

export {
	SpeedSelector
};