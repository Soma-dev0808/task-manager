import { commonTagRules } from '@/const/constants'
import {
  Container,
  TitleContainer,
  Title,
  TitleInput,
  SaveButton,
  EditButton,
  CloseButton,
  TextArea,
  DetailContainer,
  SubDetailsArea,
  SubDetailContainer,
  SpanLabel,
  Input,
  SpanDetail,
} from './Styles'
import { useSidebar } from '../hooks/useSideBar'

export const Sidebar = () => {
  const {
    isSidebarOpen,
    taskInfo,
    columnInfo,
    isEditable,
    handleToggleEditable,
    handleClose,
    handleEditTitle,
    handleEditContent,
    handleEditEstimate,
    handleUpdateTask,
  } = useSidebar()
  return (
    <Container id="sidebar" isOpen={isSidebarOpen}>
      <TitleContainer>
        {isEditable ? (
          <TitleInput
            type="text"
            maxLength={commonTagRules.maxLength}
            value={taskInfo?.title}
            onChange={handleEditTitle}
          />
        ) : (
          <Title>{taskInfo?.title}</Title>
        )}

        {isEditable ? (
          <SaveButton type="button" onClick={handleUpdateTask}>
            Save
          </SaveButton>
        ) : (
          <EditButton type="button" onClick={handleToggleEditable}>
            Edit
          </EditButton>
        )}
        <CloseButton type="button" onClick={handleClose}>
          Close
        </CloseButton>
      </TitleContainer>

      <DetailContainer>
        <TextArea
          name="content"
          readOnly={!isEditable}
          value={taskInfo?.content}
          id=""
          cols={40}
          rows={20}
          onChange={handleEditContent}
        />

        <SubDetailsArea>
          <SubDetailContainer>
            <SpanLabel>Status</SpanLabel>
            <SpanDetail>{columnInfo?.title}</SpanDetail>
          </SubDetailContainer>

          <SubDetailContainer>
            <SpanLabel>Estimate</SpanLabel>
            {isEditable ? (
              <Input type="text" onChange={handleEditEstimate} value={taskInfo?.estimate ?? ''} />
            ) : (
              <SpanDetail>{taskInfo?.estimate}</SpanDetail>
            )}
          </SubDetailContainer>
        </SubDetailsArea>
      </DetailContainer>
    </Container>
  )
}
