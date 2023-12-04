export function GET() {
  const user = {
    id: "1",
    name: "Vũ Văn Thống",
    email: "pencil.bsp@gmail.com",
  }

  return Response.json(user, { status: 404 })
}

export async function POST(request) {
  const body = await request.json()
  console.log(body)
  return Response.json({ status: "ok" })
}
