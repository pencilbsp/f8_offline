import districts from "./quan_huyen.json"
// import cities from "../../provinces/tinh_tp.json"

export function GET(request, { params }) {
  try {
    const id = params.id[0]
    if (!id) return Response.json({ data: [] })

    return Response.json({ data: Object.values(districts).filter((district) => district["parent_code"] === id) })
  } catch (error) {
    return Response.json({ data: [] })
  }
}
