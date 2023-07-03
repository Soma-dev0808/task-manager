import { useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IconButton } from '@/components/ui/Button'
import { PlusIcon } from '@/components/ui/Icons/PlusIcon'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { useAuthToken } from '@/hooks/useAuthToken'
import { useAppDispatch } from '@/redux/app/hook'
import { taskBoardReducerActions } from '@/redux/feature/taskBoardSlice'
import { Menu, MenuBarContainer, ColumnInputContainer } from './Styles'

export const MenuBar = () => {
  const [columnName, setColumnName] = useState('')
  const isEmpty = useMemo(() => columnName === '', [columnName])
  const dispatch = useAppDispatch()
  const { getToken } = useAuthToken()
  const { boardId } = useParams()
  const { showToast } = useShowToast()

  const handleCreateColumn = useCallback(async () => {
    const token = getToken()

    if (isEmpty || typeof token === 'undefined' || typeof boardId === 'undefined') return

    await dispatch(
      taskBoardReducerActions.createColumn({
        token,
        title: columnName,
        boardId,
      })
    )

    showToast({
      type: 'success',
      title: 'Column created',
      message: 'Column created successfully',
    })
  }, [columnName, dispatch, getToken, boardId, isEmpty, showToast])

  return (
    <MenuBarContainer>
      <Menu>
        <div>
          Add Column:
          <ColumnInputContainer>
            <input value={columnName} onChange={(e) => setColumnName(e.target.value)} />
            <IconButton
              type="button"
              buttonColor="primary"
              disabled={isEmpty}
              onClick={handleCreateColumn}
            >
              <PlusIcon />
            </IconButton>
          </ColumnInputContainer>
        </div>
      </Menu>
    </MenuBarContainer>
  )
}
