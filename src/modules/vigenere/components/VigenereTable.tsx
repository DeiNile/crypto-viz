import '../styles/VigenereTable.scss';
import React from 'react';
import { GlobalState } from '../../../components/CryptoViz';
import { injectWithState } from '../../../utils/wrapWithMobx';
import classNames from 'classnames';
import { assertUnitializedVigenereVisualizer, assertUninitializedVigenereCipher } from '../utils/assertUnitializer';

interface VigenereTableDataProps {
	table: string[][];
	isVisible: boolean;
	highlightedRow?: number;
	highlightedColumn?: number;
	animationSpeed?: number;
}

const BaseVigenereTable: React.SFC<VigenereTableDataProps> = (props: VigenereTableDataProps) => {
	const { table, highlightedColumn, highlightedRow, isVisible, animationSpeed }  = props;

	const tableHeader: string[] = [''].concat(table[0].slice(0));
	const tableBody: string[][] = [];
	const speed: number = animationSpeed !== undefined
		? animationSpeed
		: 1000;

	table.forEach((row: string[], i: number) => {
		const rowWithVerticalHeader: string[] = [row[0]].concat(row);
		tableBody.push(rowWithVerticalHeader);
	});


	if (!isVisible) {
		return null;
	}

	return (
		<table className='vigenere-table'>
			<thead>
				<tr>
					{tableHeader.map((cellValue: string, i: number) => {
						const className = classNames({
							['horizontal-header']: i !== 0,
							['vertical-highlight']: highlightedColumn !== undefined && i === highlightedColumn + 1
						});

						return <th className={className} key={`header-${i}`} style={{transitionDuration: `${speed}ms`}}>{cellValue}</th>;
					})}
				</tr>
			</thead>
			<tbody>
				{tableBody.map((row: string[], i: number) => {
					return (
						<tr key={`row-${i}`}>
							{row.map((cellValue: string, j: number) => {

								const className: string = classNames({
									['even-row']: j !== 0 && i % 2 === 0,
									['vertical-header']: j === 0,
									['vertical-highlight']: highlightedColumn !== undefined && j === highlightedColumn + 1,
									['horizontal-highlight']: highlightedRow !== undefined && i === highlightedRow
								});
								const key: string = `column-${j}`;

								return j === 0
									? <th className={className} key={key}  style={{transitionDuration: `${speed}ms`}}>{cellValue}</th>
									: <td className={className} key={key}  style={{transitionDuration: `${speed}ms`}}>{cellValue}</td>;
							})}
						</tr>
					);
				})
				}
			</tbody>
		</table>
	);
};

function stateInjector({ rootStore }: GlobalState): VigenereTableDataProps {

	if (rootStore.moduleStore.vigenereCipher === null) {
		throw assertUninitializedVigenereCipher();
	}
	if (rootStore.moduleStore.vigenereVisualizerStore === null) {
		throw assertUnitializedVigenereVisualizer();
	}

	return {
		isVisible: rootStore.moduleStore.vigenereCipher.lastAction !== null,
		table: rootStore.moduleStore.vigenereCipher.vigenereTable,
		highlightedColumn: rootStore.moduleStore.vigenereVisualizerStore.highlightedColumn !== null
			? rootStore.moduleStore.vigenereVisualizerStore.highlightedColumn
			: undefined,
		highlightedRow: rootStore.moduleStore.vigenereVisualizerStore.highlightedRow !== null
			? rootStore.moduleStore.vigenereVisualizerStore.highlightedRow
			: undefined,
		animationSpeed: rootStore.visualizerControlStore.animationSpeedInMs
	};
}

interface StatefulVigenereTableProps {}

const VigenereTable = injectWithState<StatefulVigenereTableProps>(stateInjector, BaseVigenereTable, 'VigenereTable');

export {
	VigenereTable
};