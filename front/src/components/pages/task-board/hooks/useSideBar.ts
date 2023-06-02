import { useCallback, useEffect, useState } from 'react'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { useAuthToken } from '@/hooks/useAuthToken'
import { useAppSelector, useAppDispatch } from '@/redux/app/hook'
import {
  TaskType,
  selectColumn,
  selectSideBar,
  taskBoardReducerActions,
} from '@/redux/feature/taskBoardSlice'

export const useSidebar = () => {
  const { isOpen: isSidebarOpen, task: sideBarTask, columnId } = useAppSelector(selectSideBar)
  const columnInfo = useAppSelector(selectColumn(columnId ?? ''))
  const [taskInfo, setTaskInfo] = useState<TaskType>({
    id: '',
    title: '',
    content: '',
    estimate: 0,
  })

  const [isEditable, setIsEditable] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { showToast } = useShowToast()
  const { getToken } = useAuthToken()

  useEffect(() => {
    if (typeof sideBarTask === 'undefined') return
    setTaskInfo(sideBarTask)
  }, [sideBarTask])

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsEditable(false)
      setTaskInfo({ id: '', title: '', content: '', estimate: 0 })
    }
  }, [isSidebarOpen])

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('#sidebar') || !isSidebarOpen) return
      dispatch(
        taskBoardReducerActions.toggleSidebar({
          isOpen: false,
        })
      )
    },
    [dispatch, isSidebarOpen]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSidebarOpen, handleClickOutside])

  const handleToggleEditable = () => setIsEditable((prev) => !prev)

  const handleDeleteTask = async () => {
    const token = getToken()
    if (
      typeof taskInfo.id === 'undefined' ||
      typeof columnId === 'undefined' ||
      typeof token === 'undefined'
    )
      return
    await dispatch(
      taskBoardReducerActions.deleteTask({
        taskId: taskInfo.id,
        columnId: columnId,
        token,
      })
    )
    dispatch(
      taskBoardReducerActions.toggleSidebar({
        isOpen: false,
      })
    )
    showToast({
      title: 'Task Deleted',
      message: `Task name: ${taskInfo.title}`,
      options: {
        position: 'bottom-right',
      },
    })
  }

  const handleClose = () => {
    dispatch(
      taskBoardReducerActions.toggleSidebar({
        isOpen: false,
      })
    )
  }

  const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInfo((prev) => ({ ...prev, title: e.target.value }))
  }

  const handleEditContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskInfo((prev) => ({ ...prev, content: e.target.value }))
  }

  const handleEditEstimate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number.isNaN(Number(e.target.value)) || Number(e.target.value) < 0) return
    setTaskInfo((prev) => ({ ...prev, estimate: Number(e.target.value) }))
  }

  const handleUpdateTask = async () => {
    const token = getToken()
    if (typeof taskInfo.id === 'undefined' || taskInfo.title === '' || typeof token === 'undefined')
      return
    await dispatch(
      taskBoardReducerActions.updateTask({
        ...taskInfo,
        taskId: taskInfo.id,
        estimate: taskInfo.estimate ?? 0,
        token,
      })
    )
    setIsEditable(false)
    showToast({
      title: 'Task updated',
      message: `Task name: ${taskInfo.title}`,
      options: {
        position: 'bottom-right',
      },
    })
  }

  return {
    isSidebarOpen,
    taskInfo,
    columnInfo,
    isEditable,
    handleToggleEditable,
    handleDeleteTask,
    handleClose,
    handleEditTitle,
    handleEditContent,
    handleEditEstimate,
    handleUpdateTask,
  }
}
