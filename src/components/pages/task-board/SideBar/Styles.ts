import styled from 'styled-components'
import { ContainerProps } from './type'

const Container = styled.div<ContainerProps>`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: -532px;
  height: 100%;
  width: 500px;
  background-color: #f8f9fa;
  padding: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease;
  right: ${(props) => (props.isOpen ? '0' : '-532px')};
  background-color: ${({ theme }) => theme.colors.baseBlack};
  border-left: 1px solid ${({ theme }) => theme.colors.baseBoarder};
  overflow-y: scroll;
  // TODO:fix here
  @media (max-width: 540px) {
    width: 100%;
  }
`

const TitleContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.baseBoarder};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 0;
  // TODO:fix here
  @media (max-width: 540px) {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`

const Title = styled.h2`
  margin: 0;
  padding: 0px;
  flex-grow: 1;
`

const TitleInput = styled.input`
  font-size: 1.5em;
  flex-grow: 1;
  margin-right: 16px;
  @media (max-width: 540px) {
    width: 100%;
    margin-right: 0px;
  }
`
const ButtonContainer = styled.div`
  @media (max-width: 540px) {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 5px;
  }
`

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
`

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.default};
`

const CloseButton = styled.button`
  margin-left: 8px;
  background-color: transparent;
  outline: none;
  border: none;
  &:focus {
    outline: none;
  }
`

const TextArea = styled.textarea`
  resize: none;
  margin-right: 16px;
  padding: 8px;
  @media (max-width: 540px) {
    margin-right: 0px;
  }
`

const DetailContainer = styled.div`
  display: flex;
  // TODO:fix here
  @media (max-width: 540px) {
    flex-direction: column;
  }
`

const SubDetailsArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const SubDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 8px 0px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.baseBoarder};
`

const SpanLabel = styled.span`
  font-weight: 600;
  color: #7d8590;
  margin-bottom: 8px;
`
const SpanDetail = styled.span`
  font-weight: 600;
  color: white;
`

const Input = styled.input`
  margin-bottom: 8px;
`

export {
  Container,
  TitleContainer,
  Title,
  TitleInput,
  ButtonContainer,
  SaveButton,
  EditButton,
  CloseButton,
  TextArea,
  DetailContainer,
  SubDetailsArea,
  SubDetailContainer,
  SpanLabel,
  SpanDetail,
  Input,
}
