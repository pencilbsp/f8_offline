"use client"

import useConnect from "@/hooks/useConnect"

export default function Layout({ children }) {
  useConnect()

  return children
}
