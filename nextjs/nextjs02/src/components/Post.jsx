"use client"

import Link from "next/link"

export default function Post({ post }) {
  const { title, id } = post

  return (
    <li className="border p-2">
      <h3>{title}</h3>
      <Link href={`/posts/${id}`}>Chi tiết</Link>
    </li>
  )
}
