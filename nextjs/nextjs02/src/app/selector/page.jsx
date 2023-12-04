"use client"

import { useState } from "react"
import useSWR from "swr"

const fetcher = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  return Object.values(data.data)
}

export default function Selector() {
  const [provinceId, setProvinceId] = useState("")
  const { data: cities } = useSWR("/api/provinces", fetcher, { fallbackData: [] })
  const { data: districts } = useSWR(`/api/districts/${provinceId}`, fetcher, { fallbackData: [] })

  return (
    <div>
      <select defaultValue="" name="provinceId" onChange={(e) => setProvinceId(e.target.value)}>
        <option value="">Chọn tỉnh/thành phố</option>
        {cities.map((city) => (
          <option key={city.code} value={city.code}>
            {city.name}
          </option>
        ))}
      </select>
      <select defaultValue="" name="district">
        <option value="">Chọn quận/huỵen</option>
        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>
    </div>
  )
}
