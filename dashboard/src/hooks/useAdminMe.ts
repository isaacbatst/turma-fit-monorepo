import useSWR from "swr"

export const useAdminMe = () => {
  return useSWR('/admin/me', async () => {
    const response = await fetch(`http://localhost:5555/admin/me`, {
      credentials: 'include',
    })
    const data = await response.json()
    return data
  })
}