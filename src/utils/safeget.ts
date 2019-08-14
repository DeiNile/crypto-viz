

function safeGet<T, F>(getter: () => T, fallback: T | F, fallbackOnNullUndefined: boolean = false): T | F {
	try {
		const value: T = getter();

		return fallbackOnNullUndefined && (value === null || value === undefined)
			? fallback
			: value;
	}
	catch (exception) {
		return fallback;
	}
}

export {
	safeGet
};