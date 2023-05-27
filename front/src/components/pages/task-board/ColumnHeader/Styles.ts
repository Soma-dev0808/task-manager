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

const Button = styled.button`
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 10px;
  height: 10px;
`

export { Container, Title, Button, Image }
