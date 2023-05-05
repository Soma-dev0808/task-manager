import styled from 'styled-components'

const Container = styled.div`
  overflow-x: scroll;
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 1024px) {
    justify-content: start;
  }
`

export { Container }
