import { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface ModalProps {
  isOpen: boolean
  onOutSideClicked: () => void
  children: ReactNode
}

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 9999;
`

const ModalContent = styled.div`
  position: fixed;
  background: white;
  width: 400px;
  max-width: 50%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`

const ModalTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.baseBlack};
  margin: 0;
`
const ModalDescription = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.baseBlack};
`

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`

const Modal: FC<ModalProps> = ({ isOpen, onOutSideClicked, children }) => {
  return (
    <ModalWrapper isOpen={isOpen} onClick={onOutSideClicked}>
      <ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
    </ModalWrapper>
  )
}

export { Modal, ModalTitle, ModalDescription, ModalButtonContainer }
