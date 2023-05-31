import { useEffect, useCallback } from 'react'

import type { OnDragEndResponder } from 'react-beautiful-dnd'

import { useParams } from 'react-router-dom'
import { useAuthToken } from '@/hooks/useAuthToken'
import { useAppDispatch } from '@/redux/app/hook'
import { taskBoardReducerActions } from '@/redux/feature/taskBoardSlice'
import { useFetchTaskData } from './useFetchTaskData'

const useTaskBoard = () => {
  const dispatch = useAppDispatch()
  const { taskBoardData, taskBoardName, fetchTaskData } = useFetchTaskData()
  const { getToken } = useAuthToken()
  const { boardId } = useParams()

  useEffect(() => {
    const token = getToken()
    if (typeof token === 'undefined' || typeof boardId === 'undefined') return
    fetchTaskData(boardId, token)
  }, [fetchTaskData, getToken, boardId])

  // TODO: add loader
  // console.log(isLoading)

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { destination, source, draggableId, type } = result

      if (!destination) return
      if (destination.droppableId === source.droppableId && destination.index === source.index)
        return

      // modify column order
      if (type === 'column') {
        dispatch(
          taskBoardReducerActions.handleMoveColumn({
            source,
            destination,
            draggableId,
          })
        )
        return
      }

      const start = taskBoardData.columns[source.droppableId]
      const end = taskBoardData.columns[destination.droppableId]

      // modify task order within column
      if (start === end) {
        dispatch(
          taskBoardReducerActions.handleMoveTaskWithinColumn({
            source,
            destination,
            draggableId,
          })
        )
        return
      }

      // modify task order between columns
      dispatch(
        taskBoardReducerActions.handleMoveTaskOverColumn({
          start,
          end,
          source,
          destination,
          draggableId,
        })
      )
    },
    [dispatch, taskBoardData]
  )

  return {
    taskBoardName,
    taskBoardData,
    onDragEnd,
  }
}

export { useTaskBoard }
