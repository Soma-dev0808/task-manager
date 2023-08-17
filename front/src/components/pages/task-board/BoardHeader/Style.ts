import styled from 'styled-components'

const Title = styled.h1`
  font-size: 2rem;
`
const Buttons = styled.div`
  display: flex;
  gap: 20px;
`

const UserButtonDiv = styled.div`
  display: flex;
`

const UserNumber = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 0, 0, 0.697);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export { Title, Buttons, UserButtonDiv, UserNumber }
