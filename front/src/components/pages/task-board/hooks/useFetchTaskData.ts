import { useCallback, useEffect } from 'react'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { useAppSelector, useAppDispatch } from '@/redux/app/hook'
import { selectTaskBoardSlice, taskBoardReducerActions } from '@/redux/feature/taskBoardSlice'

const useFetchTaskData = () => {
  const { isLoading, taskBoardData, taskBoardName, error } = useAppSelector(selectTaskBoardSlice)
  const { showToast } = useShowToast()
  const dispatch = useAppDispatch()

  const fetchTaskData = useCallback(
    (boardId: string, token: string) => {
      dispatch(
        taskBoardReducerActions.fetchTaskData({
          boardId,
          token,
        })
      )
    },
    [dispatch]
  )

  useEffect(() => {
    if (typeof error === 'undefined') return
    showToast({
      title: 'Error',
      message: error,
      type: 'error',
      options: {
        autoClose: false,
      },
    })
  }, [error, showToast])

  return { isLoading, taskBoardData, taskBoardName, fetchTaskData }
}

export { useFetchTaskData }
