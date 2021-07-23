import styled from 'styled-components';

const RecipeInProgressContainer = styled.div`
	align-items: center;
	background: #fdfefb;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;
	max-width: 1120px;
	overflow: hidden;

	h3 {
		align-self: baseline;
		display: flex;
		justify-content: center;
		margin: 1rem;
	}

	.componente1 {
		.recipe-info {
			align-items: center;
			display: flex;
			justify-content: space-evenly;
			margin: 1rem 0.7rem;
			margin-top: 32px;
			max-width: 978px;
			width: 100%;

			.recipe-details {
				margin: auto 0.5em;
				justify-content: center;
			}
		}

		.ingredients-count-summary {
			color: #4a4a4a;
			display: flex;
			flex-direction: row;
			justify-content: center;
			margin: 20px -28px;
			width: 26em;

			#ingredient-length {
				border: 0;
				display: inline-block;
				font: inherit;
				font-size: 40px;
				font-weight: 400;
				line-height: 1.2;
				margin: 0;
				padding: 0;
			}
		}

		.icons {
			display: flex;
			align-items: center;
			align-content: center;
			justify-content: space-evenly;
		}

		h3 {
			color: #707070;
			display: block;
			font-size: 1.2rem;
			justify-self: center;
			line-height: 1;
			margin: 0 auto;
			margin-block-end: 1em;
			margin-block-start: 1em;
			margin-inline-end: 0;
			margin-inline-start: 0;
			padding-right: 10px;
			text-align: center;
			text-transform: uppercase;
		}

		.recipe-title {
			font-size: 2rem;
			line-height: 2.5rem;
			text-align: center;
			text-transform: capitalize;
		}

		.container {
			display: flex;
			justify-content: space-around;

			div {
				display: flex;
			}
		}

		.img-container {
			flex-basis: 480px;
			flex-grow: 0;
			flex-shrink: 1;
			font-size: 0;
			margin: auto;
			margin-left: 40px;
			position: relative;

			img {
				border-radius: 8px;

				height: 320px;
				max-height: auto;
				max-width: 100vw;
				object-fit: cover;
				overflow: hidden;
				width: 320px;
				/* width: 100%; */
			}
		}
	}

	.container {
		display: flex;
		justify-content: space-around;

		div {
			display: flex;
		}
	}

	.recipe-title {
		font-size: 2rem;
		text-align: center;
		text-transform: capitalize;
	}

	.ingredient-list {
		align-items: flex-start;
		display: flex;
		justify-content: flex-start;
		margin-right: 4rem;

		input {
			font-weight: 300;
		}
	}

	.instructions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 2.15rem;

		p {
			display: flex;
			flex-wrap: wrap;
			font-weight: 300;
			margin: 1rem;
			max-width: 640px;
		}
	}

	.title-wrapper {
		border: 0;
		font: inherit;
		font-size: 1em;
		margin: 0;
		padding: 0;
		vertical-align: baseline;

		h3 {
			color: #707070;
			font-size: 18px;
			line-height: 29px;
			margin: 0 0 28px;
		}
	}

	.recipe-btn {
		background: #c10644;
		border: 0;
		border-radius: 8px;
		bottom: 0;
		color: white;
		cursor: pointer;
		font-family: Poppins, sans-serif;
		font-weight: 600;
		gap: 2rem;
		height: 2.5rem;
		max-width: 200px;
		min-width: 180px;
		padding: 0 32px;
		position: fixed;
		text-transform: lowercase;
		transition: filter 0.2s;

		&:disabled {
			cursor: not-allowed;
			opacity: 0.6;
		}

		&:not(:disabled):hover {
			filter: brightness(0.9);
		}
	}

	.icon-btn {
		background-color: inherit;
		border: 0;
		cursor: pointer;
	}

	@media only screen and (max-width: 1611px) {
		align-items: center;
		margin: 0 auto;
		max-width: 820px;

		.instructions {
			p {
				max-width: 100vw;
				overflow: hidden;
			}
		}
	}

	@media only screen and (min-width: 700px) {
		.instructions {
			p {
				max-width: 70vw;
				overflow: hidden;
			}
		}

		h3 {
			margin-left: 6rem;
		}

		.ingredient-list {
			.ing ul {
				align-items: flex-start;
				justify-content: flex-start;
			}
		}
	}

	@media only screen and (max-width: 475px) {
		align-items: center;
		margin: 0 auto;
		max-width: 90vw;

		.instructions {
			p {
				max-width: 80vw;
				overflow: hidden;
			}
		}
	}
`;

export default RecipeInProgressContainer;
