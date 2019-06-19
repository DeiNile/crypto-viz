import * as React from 'react';
import { Point } from '../stores/Geometry';
import { StyledLine } from '../styled-components/StyledLine';
import { wrapWithMobx } from '../utils/wrapWithMobx';

function wrapId(id: string | undefined): string | undefined {
	return id !== undefined
		? `url(#${id})`
		: undefined;
}

interface SvgLineDataProps {
	startPoint: Point;
	endPoint: Point;
	fade?: boolean;
	startMarkerId?: string;
	endMarkerId?: string;
	midMarkerId?: string;
}

type SvgLineProps = SvgLineDataProps;

const BaseSvgLine: React.SFC<SvgLineDataProps> = (props: SvgLineProps) => {
	const { startPoint, endPoint, startMarkerId, endMarkerId, midMarkerId } = props;

	return (
		<StyledLine
			x1={startPoint.x}
			y1={startPoint.y}
			x2={endPoint.x}
			y2={endPoint.y}
			markerStart={wrapId(startMarkerId)}
			markerEnd={wrapId(endMarkerId)}
			markerMid={wrapId(midMarkerId)}
		/>
	);
};

const SvgLine = wrapWithMobx<SvgLineProps>(BaseSvgLine, 'SvgLine');

// const StyledSvgLine = styled(SvgLine)`
// 	transition: transform 500ms ease-in-out;
// 	transform: translate(
// 		${(props) => props.x},
// 		${(props) => props.y}
// 	);
// `;

export {
	SvgLine
};