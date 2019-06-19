
interface Point {
	x: number;
	y: number;
}

interface Dimension {
	width: number;
	height: number;
}

interface Line {
	startPoint: Point;
	endPoint: Point;
}

type Rectangle = Dimension & Point;

function pointsToRectangle(a: Point, b: Point): Rectangle {
	const x: number = Math.min(a.x, b.x);
	const y: number = Math.min(a.x, b.y);
	const width: number = x + Math.max(a.x, b.x);
	const height: number = y + Math.max(a.y, b.y);

	return {
		x, y, width, height
	};
}

function centerInnerRectangleInsideOuter(innerRectangle: Rectangle, outerRectangle: Rectangle): Rectangle {

	const leftOverWidth: number = outerRectangle.width - innerRectangle.width;
	const leftOverHeight: number = outerRectangle.height - innerRectangle.height;

	return {
		x: outerRectangle.x + leftOverWidth / 2,
		y: outerRectangle.y + leftOverHeight / 2,
		width: innerRectangle.width - leftOverWidth,
		height: innerRectangle.height - leftOverHeight
	};
}

function centerOuterRectangleAroundInner(innerRectangle: Rectangle, outerRectangle: Rectangle): Rectangle {

	const leftOverWidth: number = outerRectangle.width - innerRectangle.width;
	const leftOverHeight: number = outerRectangle.height - innerRectangle.height;

	return {
		x: innerRectangle.x - leftOverWidth / 2,
		y: innerRectangle.y - leftOverHeight / 2,
		width: outerRectangle.width,
		height: outerRectangle.height
	};
}

export {
	Point,
	Dimension,
	Rectangle,
	Line,
	centerInnerRectangleInsideOuter,
	centerOuterRectangleAroundInner,
	pointsToRectangle
};