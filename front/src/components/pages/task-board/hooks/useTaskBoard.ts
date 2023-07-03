import { useEffect, useCallback } from 'react'

import type { OnDragEndResponder } from 'react-beautiful-dnd'

import { useParams } from 'react-router-dom'
import { useAuthToken } from '@/hooks/useAuthToken'
import { useAppDispatch, useAppSelector } from '@/redux/app/hook'
import { selectModal, taskBoardReducerActions } from '@/redux/feature/taskBoardSlice'
import { useFetchTaskData } from './useFetchTaskData'

const useTaskBoard = () => {
  const dispatch = useAppDispatch()
  const { taskBoardData, taskBoardName, fetchTaskData } = useFetchTaskData()
  const { getToken } = useAuthToken()
  const token = getToken()
  const { boardId } = useParams()
  const { isOpen, columnId: columnIdToDelete } = useAppSelector(selectModal)

  useEffect(() => {
    if (typeof token === 'undefined' || typeof boardId === 'undefined') return
    fetchTaskData(boardId, token)
  }, [fetchTaskData, getToken, boardId, token])

  // TODO: add loader
  // console.log(isLoading)

  const onDragEnd: OnDragEndResponder = useCallback(
    (result) => {
      const { destination, source, draggableId, type } = result
      const token = getToken()

      if (!destination || !token) return
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

        dispatch(
          taskBoardReducerActions.updateColumnOrder({
            columnId: draggableId,
            columnOrderIdx: destination.index,
            token,
          })
        )
        return
      }

      const start = taskBoardData.columns[source.droppableId]
      const end = taskBoardData.columns[destination.droppableId]

      // modify task order within column
      if (start === end) {
        // update task order locally
        dispatch(
          taskBoardReducerActions.handleMoveTaskWithinColumn({
            source,
            destination,
            draggableId,
          })
        )

        // call api to update task order
        dispatch(
          taskBoardReducerActions.updateTaskOrder({
            columnId: destination.droppableId,
            taskId: draggableId,
            newOrderIdx: destination.index,
            token,
          })
        )
        return
      }

      // modify task order over columns
      dispatch(
        taskBoardReducerActions.handleMoveTaskOverColumn({
          start,
          end,
          source,
          destination,
          draggableId,
        })
      )

      // call api to update task
      dispatch(
        taskBoardReducerActions.updateTaskOrderOverColumn({
          taskId: draggableId,
          newColumnId: destination.droppableId,
          newOrderIdx: destination.index,
          token,
        })
      )
    },
    [dispatch, taskBoardData, getToken]
  )

  const handleModalClose = () => {
    dispatch(
      taskBoardReducerActions.toggleModal({
        isOpen: false,
      })
    )
  }

  const handleColumnDelete = () => {
    if (typeof columnIdToDelete === 'undefined' || typeof token === 'undefined') return
    dispatch(
      taskBoardReducerActions.deleteColumn({
        columnId: columnIdToDelete,
        token,
      })
    )

    handleModalClose()
  }

  return {
    taskBoardName,
    taskBoardData,
    onDragEnd,

    // modal
    isOpen,
    handleModalClose,
    handleColumnDelete,
  }
}

export { useTaskBoard }
