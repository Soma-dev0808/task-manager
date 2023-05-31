import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { useAuthToken } from '@/hooks/useAuthToken'
import { backend } from '@/repository'
import { routePath } from '@/routes'

type TaskBoard = {
  board_id: number
  board_name: string
}

export const useSelectTaskBoard = () => {
  const [taskBoardList, setTaskBoardList] = useState<TaskBoard[]>([])
  const [addTaskInput, setAddTaskInput] = useState<string>('')
  const { showToast } = useShowToast()
  const navigate = useNavigate()
  const { getToken } = useAuthToken()

  const handleFetchTaskBoards = useCallback(async () => {
    const token = getToken()

    if (typeof token === 'undefined') return

    const res = await backend.selectBoard.fetchBoards(token)

    if (res.status !== 200) {
      // TODO: Add error message(POPUP)
      if (res.status === 401) {
        showToast({
          type: 'error',
          title: 'You need to login',
          message: 'Please login',
        })
        navigate(routePath.login)
        return
      }
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Something went wrong',
      })
      return
    }

    const { taskBoards } = res.data
    setTaskBoardList(taskBoards as TaskBoard[])
  }, [navigate, showToast, getToken])

  const handleCreateTaskBoard = useCallback(
    async (boardName: string) => {
      const token = getToken()
      if (typeof token === 'undefined' || boardName === '') return

      const res = await backend.selectBoard.postBoard(token, boardName)

      if (res.status !== 201) {
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Something went wrong',
        })
        return
      }

      const taskBoard = (await res.data.taskBoard) as TaskBoard

      navigate(`${routePath.taskBoard}/${taskBoard.board_id}`)
    },
    [getToken, showToast, navigate]
  )

  useEffect(() => {
    handleFetchTaskBoards()
  }, [handleFetchTaskBoards])

  return {
    taskBoardList,
    handleCreateTaskBoard,
    setAddTaskInput,
    addTaskInput,
  }
}
