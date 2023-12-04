"use client"

import { useState } from "react"
import confetti from "canvas-confetti"
import { Button } from "@nextui-org/react"

function className(...args) {
  return args.filter((c) => !!c).join(" ")
}

export default function HomeButtons({ dict }) {
  const [troll, setTroll] = useState(false)

  return (
    <div className="flex">
      <div className={className("flex gap-x-3 group flex-grow-1 flex-shrink-0", troll && "flex-row-reverse")}>
        <Button size="sm" color="primary" onClick={() => confetti()}>
          {dict.home.okieBtn}
        </Button>
        <Button size="sm" color="danger" onMouseOver={() => setTroll(!troll)}>
          {dict.home.notOkieBtn}
        </Button>
      </div>
      <div className="flex-1" />
    </div>
  )
}
