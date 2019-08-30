import '../styles/Table.scss';
import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';


interface TableDataProps {
	table: string[][];
	isVisible: boolean;
	tableClassNameSuffix?: string;
	horizontalHeader?: string[];
	verticalHeader?: string[];
	highlightedRow?: number;
	highlightedColumn?: number;
	animationSpeed?: number;
}

const BaseTable: React.SFC<TableDataProps> = (props: TableDataProps) => {
	const { table, horizontalHeader, verticalHeader, highlightedColumn, highlightedRow, isVisible, animationSpeed, tableClassNameSuffix }  = props;

	if (!isVisible) {
		return null;
	}

	const hasVerticalHeader: boolean = verticalHeader !== undefined;
	const columnHighlightOffset: number = hasVerticalHeader
		? 1
		: 0;

	const tableHeader: string[] | null = (function () {
		if (horizontalHeader !== undefined) {
			return verticalHeader !== undefined
				? [''].concat(horizontalHeader)
				: horizontalHeader;
		}

		return null;
	})();
	const tableBody: string[][] = [];
	const speed: number = animationSpeed !== undefined
		? animationSpeed
		: 1000;

	table.forEach((row: string[], i: number) => {
		if (verticalHeader !== undefined) {
			const headerValue: string = verticalHeader !== undefined && i < verticalHeader.length
			? verticalHeader[i]
			: '';
			const rowWithVerticalHeader: string[] = [headerValue].concat(row);
			tableBody.push(rowWithVerticalHeader);
		}
		else {
			tableBody.push(row);
		}
	});

	const tableClassName = classNames(
		'crypto-table',
		tableClassNameSuffix !== undefined
			? tableClassNameSuffix
			: ''
	);


	return (
		<table className={tableClassName}>
			<thead>
				{tableHeader === null ? null : (
					<tr>
						{tableHeader.map((cellValue: string, i: number) => {
							const className = classNames({
								['horizontal-header']: i !== 0,
								['vertical-highlight']: highlightedColumn !== undefined && i === highlightedColumn + columnHighlightOffset
							});

							return <th className={className} key={`header-${i}`} style={{transitionDuration: `${speed}ms`}}>{cellValue}</th>;
						})}
					</tr>
				)}
			</thead>
			<tbody>
				{tableBody.map((row: string[], i: number) => {
					return (
						<tr key={`row-${i}`}>
							{row.map((cellValue: string, j: number) => {

								const className: string = classNames({
									['even-row']: i % 2 === 0 && hasVerticalHeader && j !== 0,
									['vertical-header']: hasVerticalHeader && j === 0,
									['vertical-highlight']: highlightedColumn !== undefined && j === highlightedColumn + columnHighlightOffset,
									['horizontal-highlight']: highlightedRow !== undefined && i === highlightedRow
								});
								const key: string = `column-${j}`;

								return hasVerticalHeader && j === 0
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

const Table = observer(BaseTable);

export {
	Table,
	TableDataProps
};