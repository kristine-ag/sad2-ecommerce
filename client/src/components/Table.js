import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    text-transform: uppercase;
    color: #fbff54;
    font-weight: 600;
    font-size: 1rem;
    padding: 10px;
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />;
}
