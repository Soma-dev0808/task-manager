import styled from 'styled-components'

const Container = styled.div`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 1024px) {
    justify-content: start;
  }
`

const Title = styled.h1`
  text-align: center;
`

export { Container, Title }
