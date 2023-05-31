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

export const taskBoardImpl = { fetchTaskBoardData }
