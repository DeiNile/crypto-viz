
function ordinalSuffix(num: number): string {
	const leastSignificantDigit: number = num % 10;
	const secondLeastSignificantDigit: number = num % 100;

	if (leastSignificantDigit === 1 && secondLeastSignificantDigit !== 11) {
		return `${num}st`;
	}
	else if (leastSignificantDigit === 2 && secondLeastSignificantDigit !== 22) {
		return `${num}nd`;
	}
	else if (leastSignificantDigit === 3 && secondLeastSignificantDigit !== 33) {
		return `${num}rd`;
	}
	else {
		return `${num}th`;
	}
}

export {
	ordinalSuffix
};