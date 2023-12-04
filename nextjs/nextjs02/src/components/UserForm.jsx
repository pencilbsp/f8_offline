"use client"

import { mutate } from "swr"
import { useTransition } from "react"

import { USER_API } from "./Users"

export default function UserForm() {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (event) => {
    startTransition(async () => {
      event.preventDefault()
      const formData = new FormData(event.target)
      const name = formData.get("name")

      console.log(name)

      const response = await fetch(USER_API, {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) mutate(USER_API)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Người dùng mới"
        className="border rounded focus:outline-none px-2 py-1"
      />
      <button type="submit" className="border rounded px-2 disabled:opacity-70" disabled={isPending}>
        Thêm
      </button>
    </form>
  )
}
