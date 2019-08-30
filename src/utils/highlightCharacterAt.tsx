import React from 'react';

function highlightCHaracterAt(value: string, className: string, i?: number) {
	if (i !== undefined && i < value.length) {
		const highlightedCharacter: string = value.charAt(i);

		return <span>{value.slice(0, i)}<mark className={className}>{highlightedCharacter}</mark>{value.slice(i + 1)}</span>;
	}

	return <span>{value}</span>;
}

export {
	highlightCHaracterAt as highlightCharacterAt
};