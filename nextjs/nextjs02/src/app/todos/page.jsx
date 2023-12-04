import TodoFormAction from "@/components/TodoFormAction"

export const todoApi = "http://localhost:3001/todos"

const getTodos = async () => {
  const response = await fetch(todoApi, {
    next: {
      tags: ["todos"],
    },
  })
  const todos = await response.json()

  return todos
}

export default async function TodoPage() {
  const todos = await getTodos()

  return (
    <div className="container mx-auto p-4">
      <h1>Todo App</h1>
      <ul className="py-2">
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>

      <TodoFormAction />
    </div>
  )
}
