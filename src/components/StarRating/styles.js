import styled from 'styled-components';

const StarContainer = styled.div`
	display: inline-block;
	margin: 12px auto;

	input[type='radio'] {
		display: none;
	}

	.star {
		cursor: pointer;
	}
`;

export default StarContainer;
