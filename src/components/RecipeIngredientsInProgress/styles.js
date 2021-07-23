import styled from 'styled-components';

const Container = styled.div`
	align-items: normal;

	label {
		cursor: pointer;
		display: block;
		font-weight: 300;
	}

  input[type="checkbox"] {
    cursor: pointer;
  }
  
	.checked {
		text-decoration: line-through;
	}
`;

export default Container;
