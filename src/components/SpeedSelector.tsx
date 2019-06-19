import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { VisualizerSpeed } from '../stores/VisualizerControlStore';

interface SpeedSelectorDataProps {
	currentSpeed: VisualizerSpeed;
	availableSpeeds: VisualizerSpeed[];
	disabled?: boolean;
}

interface SpeedSelectorEvents {
	changeSpeed(newSpeed: VisualizerSpeed): void;
}

type SpeedSelectorProps = SpeedSelectorDataProps & SpeedSelectorEvents;

class BaseSpeedSlector extends React.Component<SpeedSelectorProps> {

	render() {
		const { currentSpeed, availableSpeeds, changeSpeed, disabled = false } = this.props;

		return (
			<select
				value={currentSpeed}
				disabled={disabled}
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

const SpeedSelector = wrapWithMobx<SpeedSelectorProps>(BaseSpeedSlector, 'SpeedSelector');

export {
	SpeedSelector
};