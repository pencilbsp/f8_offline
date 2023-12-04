"use client"

import { useState } from "react"

export default function PageDetail({ post }) {
  const [show, setShow] = useState(false)

  return (
    <div className="max-w-sm">
      <h1 className="text-2xl">{post.title}</h1>
      <p className={[show && "line-clamp-1"].join(" ")}>{post.body}</p>
      <button onClick={() => setShow(!show)}>{show ? "Hiện thị thêm" : "Thu gọn"}</button>
    </div>
  )
}
