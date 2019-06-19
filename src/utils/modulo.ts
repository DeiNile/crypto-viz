function modulo(n: number, p: number) {
	const num: number = (n < 0)
		? p - Math.abs(n) % p
		: n;

	return num % p;
}

export {
	modulo
};