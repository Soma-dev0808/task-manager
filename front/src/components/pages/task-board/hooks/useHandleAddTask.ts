import { useEffect, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'
import { useShowToast } from '@/components/ui/Toast/hooks/useShowToast'
import { taskBoardReducerActions } from '@/redux/feature/taskBoardSlice'

const useHandleAddTask = ({ id, handleClose }: { id: string; handleClose?: () => void }) => {
  const ref = useRef<HTMLInputElement>(null)
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')
  const dispatch = useDispatch()
  const { showToast } = useShowToast()

  // focus on render
  useEffect(() => {
    ref.current?.focus()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.target.value)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddTask()
  }

  const handleAddTask = () => {
    dispatch(taskBoardReducerActions.handleAddTask({ columnId: id, title: newTaskTitle }))
    setNewTaskTitle('')
    showToast({
      title: 'Task added',
      message: `Task name: ${newTaskTitle}`,
    })
    if (typeof handleClose !== 'undefined') handleClose()
  }

  const isEmpty = newTaskTitle.length === 0

  return { ref, newTaskTitle, isEmpty, handleInputChange, handleKeyDown, handleAddTask }
}

export { useHandleAddTask }
