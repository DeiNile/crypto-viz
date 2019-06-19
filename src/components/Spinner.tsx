import * as React from 'react';
import styled from 'styled-components';

interface SpinnerProps {
	className?: string;
}

/**
 * For the Spinner to work as intended it MUST be declared before the main content.
 * If the Spinner is not the first element declared it will not cover the sibling components.
 *
 * Good Example:
 * <div>
 *     <Spinner />
 *     <YourComponent />
 * </div>
 *
 * Bad Example:
 * <div>
 *     <YourComponent />         <--- This will NOT be covered by the Spinner
 *     <Spinner />
 *     <AnotherComponent />      <--- this will be covered by the spinner
 * </div>
 *
 * @param props
 */
const BaseSpinner: React.SFC<SpinnerProps> = (props: SpinnerProps) => {

	const { className } = props;

	return (
		<div className={`spinner-background ${className}`}>
			<div className='spinner-container'>
				<div className='dot1' />
				<div className='dot2' />
				<div className='dot3' />
				<div className='dot4' />
				<div className='dot5' />
				<div className='dot6' />
				<div className='dot7' />
				<div className='dot8' />
				<div className='dot9' />
				<div className='dot10' />
				<div className='dot11' />
				<div className='dot12' />
			</div>
		</div>
	);
};

const Spinner = styled(BaseSpinner)`

	/*
		Parent MUST have position: relative;
		If parent has a non-relative position you risk that the Spinner grow past the
		bottom and right borders of the parent element.
	*/
	position: absolute;
	/* Be as tall as the parent */
	width: 100%;
	/* Be as wide as the parent */
	height: 100%;
	background-color: black;
	/*
		By giving the background an opaque color we indicate that the covered elements
		are temporarily inaccessible.
	*/
	opacity: 0.5;

	/* Center all the actual spinner element. */
	display: flex;
	justify-content: center;
	align-items: center;


	.spinner-container {
		/*
			This is needed to center individual dots that are being animated, since they must have
			position: absolute; to allow for positioning.
		*/
		position: relative;
	}


	.spinner-container div {
		/* This makes it so that we can position each dot as precisely as we need them to. */
		position: absolute;
		width: 5px;
		height: 5px;
		background: #fff;
		/* Turn the rectangular div into a circle. */
		border-radius: 50%;
		animation: spinner-animation 1.2s linear infinite;
	}

	.spinner-container .dot1 {
		animation-delay: 0s;
		top: 29px;
		left: 53px;
	}
	.spinner-container .dot2 {
		animation-delay: -0.1s;
		top: 18px;
		left: 50px;
	}
	.spinner-container .dot3 {
		animation-delay: -0.2s;
		top: 9px;
		left: 41px;
	}
	.spinner-container .dot4 {
		animation-delay: -0.3s;
		top: 6px;
		left: 29px;
	}
	.spinner-container .dot5 {
		animation-delay: -0.4s;
		top: 9px;
		left: 18px;
	}
	.spinner-container .dot6 {
		animation-delay: -0.5s;
		top: 18px;
		left: 9px;
	}
	.spinner-container .dot7 {
		animation-delay: -0.6s;
		top: 29px;
		left: 6px;
	}
	.spinner-container .dot8 {
		animation-delay: -0.7s;
		top: 41px;
		left: 9px;
	}
	.spinner-container .dot9 {
		animation-delay: -0.8s;
		top: 50px;
		left: 18px;
	}
	.spinner-container .dot10 {
		animation-delay: -0.9s;
		top: 53px;
		left: 29px;
	}
	.spinner-container .dot11 {
		animation-delay: -1s;
		top: 50px;
		left: 41px;
	}
	.spinner-container .dot12 {
		animation-delay: -1.1s;
		top: 41px;
		left: 50px;
	}
	@keyframes spinner-animation {
		0%, 20%, 80%, 100% {
			/* Make the dot shrink back to its original size */
			transform: scale(1);
		}
		50% {
			/* Make the dot grow */
			transform: scale(1.5);
		}
	}
`;

export {
	Spinner
};