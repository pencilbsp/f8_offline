"use client"
import { useRouter } from "next/navigation"

import { todoApi } from "@/app/todos/page"

export default function TodoForm() {
  const { refresh } = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get("name")

    const response = await fetch(todoApi, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      console.log("Thêm công việc thành công")
      refresh()
      // window.location.reload()
      event.target.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        name="name"
        placeholder="Tên công việc"
        className="border rounded focus:outline-none px-2 py-1"
      />
      <button className="border rounded px-2">Thêm</button>
    </form>
  )
}
