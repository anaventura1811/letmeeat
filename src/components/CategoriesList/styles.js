import styled from 'styled-components';

const CategoriesListContainer = styled.div`
	align-self: center;
	display: flex;
	margin: 0 auto;
	max-width: 600px;
	padding: 15px 30px 15px 15px;

	select {
    align-self: center;
    align-content: center;
		background: #289ea8;
		border: 0;
		color: white;
		font-family: Poppins, sans-serif;
		font-size: 1rem;
		margin: 0 auto;
		padding: 10px;
    text-align: center;
		width: 100%;

		option {
			background: #ebf4f2;
		}
	}
`;
export default CategoriesListContainer;
