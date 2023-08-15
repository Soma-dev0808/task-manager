import axios from 'axios'

const fetchUserByKeyword = async (token: string, keyword: string) => {
  return await axios
    .get(`${import.meta.env.VITE_NODEJS_SERVER}/api/users/search-user?keyword=${keyword}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => err.response)
}

export const usersImpl = {
  fetchUserByKeyword,
}
