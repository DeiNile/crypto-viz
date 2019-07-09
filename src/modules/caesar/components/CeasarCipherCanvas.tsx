import * as React from 'react';
import { injectWithState } from '../../../utils/wrapWithMobx';
import { CeasarCipherStep, CeasarCipher } from '../stores/CeasarCipher';
import { Highlighter } from '../../../components/Highlighter';
import { CeasarAnimationType } from '../stores/VisualizerStore';
import { Point, Dimension, Rectangle, Line, centerOuterRectangleAroundInner } from '../../../stores/Geometry';
import { SvgLine } from '../../../components/SvgLine';
import { Alphabet } from './Alphabet';
import { ShiftedAlphabet } from './ShiftedAlphabet';
import { GlobalState } from '../../../components/CryptoViz';

interface CeasarCipherCanvasProps {
	inputText: string | null;
	outputText: string | null;
	steps: CeasarCipherStep[];
	relativeAnimationIndex: number;
	boxSize: Dimension;
	animationStep: CeasarAnimationType;
}

interface CeasarCipherCanvasState {
	inputTextElement: SVGTextElement | null;
	outputTextElement: SVGTextElement | null;
}

class BaseCeasarCipherCanvas extends React.Component<CeasarCipherCanvasProps, CeasarCipherCanvasState> {

	private readonly plainTextPosition: Point = {
		x: 20,
		y: 20
	};
	private readonly alphabetPosition: Point = {
		x: 20,
		y: 50
	};
	private readonly shiftedAlphabetPosition: Point = {
		x: 20,
		y: 100
	};
	private readonly cipherTextPosition: Point = {
		x: 20,
		y: 140
	};

	constructor(props: CeasarCipherCanvasProps) {
		super(props);

		this.state = {
			inputTextElement: null,
			outputTextElement: null
		};
	}

	getHighlighterPosition(): Rectangle | null {

		const { steps, animationStep, relativeAnimationIndex, boxSize } = this.props;
		const { inputTextElement, outputTextElement } = this.state;

		if (inputTextElement === null || outputTextElement === null) {
			return null;
		}

		if (animationStep === CeasarAnimationType.INPUT) {

			const charPosition: DOMRect | undefined = inputTextElement.getExtentOfChar(relativeAnimationIndex);

			if (charPosition === undefined) {
				return null;
			}

			return centerOuterRectangleAroundInner(charPosition, {x: 0, y: 0, width: boxSize.width, height: boxSize.height});
		}
		else if (animationStep === CeasarAnimationType.ALPHABET_START) {
			return Object.assign({
				x: boxSize.width * steps[relativeAnimationIndex].inputTextAlphabetIndex + this.alphabetPosition.x,
				y: this.alphabetPosition.y
			}, boxSize);
		}
		else if (animationStep === CeasarAnimationType.ALPHABET_END) {
			return Object.assign({
				x: boxSize.width * steps[relativeAnimationIndex].inputTextAlphabetIndex + this.alphabetPosition.x,
				y: this.shiftedAlphabetPosition.y
			}, boxSize);
		}
		else {
			const charPosition: DOMRect | undefined = outputTextElement.getExtentOfChar(relativeAnimationIndex);

			if (charPosition === undefined) {
				return null;
			}

			return centerOuterRectangleAroundInner(charPosition, {x: 0, y: 0, width: boxSize.width, height: boxSize.height});
		}
	}

	getCurrentLine(): Line | null {

		const { inputTextElement, outputTextElement } = this.state;
		const { steps, relativeAnimationIndex, boxSize } = this.props;

		if (inputTextElement !== null && outputTextElement !== null) {

			return {
				startPoint: {
					x: boxSize.width * steps[relativeAnimationIndex].inputTextAlphabetIndex + this.alphabetPosition.x + boxSize.width / 2,
					y: this.alphabetPosition.y + boxSize.height + 5
				},
				endPoint: {
					x: boxSize.width * steps[relativeAnimationIndex].inputTextAlphabetIndex + this.alphabetPosition.x + boxSize.width / 2,
					y: this.shiftedAlphabetPosition.y - 5
				}
			};
		}

		return null;
	}

	render() {

		const { inputText, outputText } = this.props;

		if (inputText === null || outputText === null) {
			return <svg width='640' height='360' />;
		}

		const highligherPosition: Rectangle | null = this.getHighlighterPosition();
		const arrowLine: Line | null = this.getCurrentLine();

		return (
			<svg width='640' height='360'>
				<defs>
					<marker
						id='arrow'
						viewBox='0 0 10 10'
						refX='5'
						refY='5'
						markerWidth='6'
						markerHeight='6'
						orient='auto-start-reverse'
					>
						<path d='M 0 0 L 10 5 L 0 10 z' />
					</marker>
				</defs>
				<text
					x={this.plainTextPosition.x}
					y={this.plainTextPosition.y}
					ref={(textElement: SVGTextElement) => {
						if (this.state.inputTextElement === null) {
							this.setState({
								inputTextElement: textElement
							});
						}
					}}
					style={{dominantBaseline: 'text-before-edge'}}
				>
					{inputText}
				</text>

				<Alphabet
					x={this.alphabetPosition.x}
					y={this.alphabetPosition.y}
				/>

				<ShiftedAlphabet
					x={this.shiftedAlphabetPosition.x}
					y={this.shiftedAlphabetPosition.y}
				/>

				<text
					x={this.cipherTextPosition.x}
					y={this.cipherTextPosition.y}
					id='outputText'
					ref={(textElement: SVGTextElement) => {
						if (this.state.outputTextElement === null) {
							this.setState({
								outputTextElement: textElement
							});
						}
					}}
					style={{dominantBaseline: 'text-before-edge'}}
				>
					{outputText}
				</text>
				{
					highligherPosition === null
						? null
						: (
							<Highlighter
								x={highligherPosition.x}
								y={highligherPosition.y}
								width={highligherPosition.width}
								height={highligherPosition.height}
							/>
						)
				}
				{
					arrowLine !== null
						? (
							<SvgLine
								startPoint={arrowLine.startPoint}
								endPoint={arrowLine.endPoint}
								fade={true}
								endMarkerId='arrow'
							/>
						)
						: null
				}
			</svg>
		);
	}
}

type InjectedCaesarCipherCanvasProps = CeasarCipherCanvasProps;
interface StatefulCaesarCipherCanvasProps {}

function stateInjector({rootStore}: GlobalState): InjectedCaesarCipherCanvasProps {
	return {
		inputText: rootStore.algorithm.inputText,
		outputText: rootStore.algorithm.outputText,
		steps: (rootStore.algorithm as CeasarCipher).steps,
		relativeAnimationIndex: rootStore.visualizerStore.relativeAnimationIndex,
		animationStep: rootStore.visualizerStore.animationStep,
		boxSize: {
			width: rootStore.visualizerStore.fontSize * 1.1,
			height: rootStore.visualizerStore.fontSize * 1.1
		}
	};
}

const CeasarCipherCanvas = injectWithState<StatefulCaesarCipherCanvasProps>(stateInjector, BaseCeasarCipherCanvas, 'CeasarCipherCanvas');

export {
	CeasarCipherCanvas
};