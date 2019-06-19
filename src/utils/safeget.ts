

function safeGet<T>(getter: () => T, fallback: T): T {
	try {
		return getter();
	}
	catch (exception) {
		return fallback;
	}
}

export {
	safeGet
};