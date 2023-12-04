"use client"
import useSWR from "swr"

export const USER_API = "http://localhost:3001/users"

export default function User() {
  const getUsers = async (url) => {
    const response = await fetch(url)
    const users = await response.json()
    return users
  }

  const { data, isLoading, error, mutate } = useSWR(USER_API, getUsers, {
    fallbackData: [],
  })

  if (error) return <h3>Đã có lỗi xảy ra</h3>
  if (isLoading) return <h3>Đang tải danh sách</h3>

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
