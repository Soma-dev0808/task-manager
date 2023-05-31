import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #242424;
  padding: 8px;
  height: 30px;
  border: ${({ theme }) => `1px solid ${theme.colors.baseBoarder}`};
`

const Title = styled.h3`
  margin: 0;
  flex-grow: 1;
`

export { Container, Title }
