import axios from 'axios'

export const postAddedUser = async (token: string, board_id: string, user_id: string) => {
  return await axios
    .post(
      `${import.meta.env.VITE_NODEJS_SERVER}/api/task-board/add-user`,
      {
        user_id: user_id,
        board_id: board_id,
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
