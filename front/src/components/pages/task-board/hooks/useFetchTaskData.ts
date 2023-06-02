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
    if (typeof error !== 'string') return
    showToast({
      title: 'error',
      message: error,
      type: 'error',
    })
  }, [error, showToast])

  return { isLoading, taskBoardData, taskBoardName, fetchTaskData }
}

export { useFetchTaskData }
