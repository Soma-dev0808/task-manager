import axios from 'axios'

// create hooks to get token
const fetchTaskBoardData = async (token: string, boardId: string) => {
  return await axios
    .get(`${import.meta.env.VITE_NODEJS_SERVER}/api/columns/${boardId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => err.response)
}

const postTask = async (columnId: string, title: string, token: string) => {
  return await axios
    .post(
      `${import.meta.env.VITE_NODEJS_SERVER}/api/tasks/create`,
      {
        column_id: columnId,
        title: title,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => err.response)
}

const updateTask = async (
  taskId: string,
  title: string,
  content: string,
  estimate: number,
  token: string
) => {
  return await axios.put(
    `${import.meta.env.VITE_NODEJS_SERVER}/api/tasks/update/${taskId}`,
    {
      title: title,
      estimate: estimate,
      content: content,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

const deleteTask = async (taskId: string, token: string) => {
  return await axios.delete(`${import.meta.env.VITE_NODEJS_SERVER}/api/tasks/delete/${taskId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
}

const postColumn = async (boardId: string, title: string, token: string) => {
  return await axios.post(
    `${import.meta.env.VITE_NODEJS_SERVER}/api/columns/create`,
    {
      board_id: boardId,
      title,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const taskBoardImpl = { fetchTaskBoardData, postTask, updateTask, deleteTask, postColumn }
