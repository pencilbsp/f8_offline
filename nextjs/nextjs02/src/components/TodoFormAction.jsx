"use client"

import { useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

import { addTodo } from "@/actions/addTodo"

const initialState = { message: null }

const TodoFormAction = () => {
  const [state, formAction] = useFormState(addTodo, initialState)
  const { pending } = useFormStatus()
  const formRef = useRef()

  return (
    <form ref={formRef} action={formAction} className="flex gap-2">
      <input
        type="text"
        name="name"
        placeholder="Tên công việc"
        className="border rounded focus:outline-none px-2 py-1"
      />
      <button type="submit" className="border rounded px-2 disabled:opacity-70" disabled={pending}>
        Thêm
      </button>
    </form>
  )
}

export default TodoFormAction
