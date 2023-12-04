"use server"

import { todoApi } from "@/app/todos/page"
import { revalidateTag } from "next/cache"

export async function addTodo(prevState, formData) {
  const name = formData.get("name")
  const response = await fetch(todoApi, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.ok) {
    revalidateTag("todos")
  }
}
