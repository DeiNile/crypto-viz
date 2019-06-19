import * as React from 'react';
import { wrapWithMobx } from '../utils/wrapWithMobx';
import { CeasarCipherStep } from '../stores/CeasarCipher';
import { BoxedCharacterLine } from './BoxedCharacterLine';
import { cryptoGlobals } from '../stores/Globals';
import { StyledHighlighter } from './Highlighter';
import { CeasarAnimationType } from '../stores/VisualizerStore';
import { Point, Dimension, Rectangle, Line, centerOuterRectangleAroundInner } from '../stores/Geometry';
import { SvgLine } from './SvgLine';

interface CeasarCipherCanvasProps {
	inputText: string | null;
	outputText: string | null;
	alphabet: string[];
	shiftedAlphabet: string[];
	steps: CeasarCipherStep[];
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

	private readonly boxSize: Dimension = {
		width: cryptoGlobals.visualizerStore.fontSize * 1.1,
		height: cryptoGlobals.visualizerStore.fontSize * 1.1
	};

	constructor(props: CeasarCipherCanvasProps) {
		super(props);

		this.state = {
			inputTextElement: null,
			outputTextElement: null
		};
	}

	getHighlighterPosition(): Rectangle | null {

		const { steps } = this.props;
		const { inputTextElement, outputTextElement } = this.state;
		const relativeAnimationIndex: number = cryptoGlobals.visualizerStore.relativeAnimationIndex;
		const animationStep: CeasarAnimationType = cryptoGlobals.visualizerStore.animationStep;

		if (inputTextElement === null || outputTextElement === null) {
			return null;
		}

		if (animationStep === CeasarAnimationType.INPUT) {

			const charPosition: DOMRect | undefined = inputTextElement.getExtentOfChar(relativeAnimationIndex);

			if (charPosition === undefined) {
				return null;
			}

			return centerOuterRectangleAroundInner(charPosition, {x: 0, y: 0, width: this.boxSize.width, height: this.boxSize.height});
		}
		else if (animationStep === CeasarAnimationType.ALPHABET_START) {
			return Object.assign({
				x: this.boxSize.width * steps[relativeAnimationIndex].inputTextAlphabetIndex + this.alphabetPosition.x,
				y: this.alphabetPosition.y
			}, this.boxSize);
		}
		else if (animationStep === CeasarAnimationType.ALPHABET_END) {
			return Object.assign({
				x: this.boxSize.width * steps[relativeAnimationIndex].inputTextAlphabetIndex + this.alphabetPosition.x,
				y: this.shiftedAlphabetPosition.y
			}, this.boxSize);
		}
		else {
			const charPosition: DOMRect | undefined = outputTextElement.getExtentOfChar(relativeAnimationIndex);

			if (charPosition === undefined) {
				return null;
			}

			return centerOuterRectangleAroundInner(charPosition, {x: 0, y: 0, width: this.boxSize.width, height: this.boxSize.height});
		}
	}

	getCurrentLine(): Line | null {

		const { inputTextElement, outputTextElement } = this.state;
		const { steps } = this.props;

		if (inputTextElement !== null && outputTextElement !== null) {
			const relativeAnimationIndex: number = cryptoGlobals.visualizerStore.relativeAnimationIndex;

			return {
				startPoint: {
					x: this.boxSize.width * steps[relativeAnimationIndex].inputTextAlphabetIndex + this.alphabetPosition.x + this.boxSize.width / 2,
					y: this.alphabetPosition.y + this.boxSize.height + 5
				},
				endPoint: {
					x: this.boxSize.width * steps[relativeAnimationIndex].inputTextAlphabetIndex + this.alphabetPosition.x + this.boxSize.width / 2,
					y: this.shiftedAlphabetPosition.y - 5
				}
			};
		}

		return null;
	}

	render() {

		const { inputText, outputText, alphabet, shiftedAlphabet } = this.props;

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

				<BoxedCharacterLine
					x={this.alphabetPosition.x}
					y={this.alphabetPosition.y}
					characters={alphabet}
					boxSize={this.boxSize}
				/>

				<BoxedCharacterLine
					x={this.shiftedAlphabetPosition.x}
					y={this.shiftedAlphabetPosition.y}
					characters={shiftedAlphabet}
					boxSize={this.boxSize}
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
							<StyledHighlighter
								x={highligherPosition.x}
								y={highligherPosition.y}
								width={highligherPosition.width}
								height={highligherPosition.height}
								animationSpeed={cryptoGlobals.visualizerControlStore.animationSpeedInMs}
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

const CeasarCipherCanvas = wrapWithMobx<CeasarCipherCanvasProps>(BaseCeasarCipherCanvas, 'CeasarCipherCanvas');

export {
	CeasarCipherCanvas
};