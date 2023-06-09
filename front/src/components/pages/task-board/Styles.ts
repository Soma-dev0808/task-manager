import styled from 'styled-components'

const Container = styled.div`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  display: flex;
  @media (max-width: 1024px) {
    justify-content: start;
  }
`

export { Container }
