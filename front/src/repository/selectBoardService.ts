import axios from 'axios'

const fetchBoards = async (token: string) => {
  // TODO: Add middleware.
  // TODO: Add snakeToCamelCase middleware
  return await axios
    .get(`${import.meta.env.VITE_NODEJS_SERVER}/api/task-board`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => err.response)
}

const postBoard = async (token: string, boardName: string) => {
  return await axios
    .post(
      `${import.meta.env.VITE_NODEJS_SERVER}/api/task-board/create`,
      {
        board_name: boardName,
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

export const selectBoardImpl = { fetchBoards, postBoard }
