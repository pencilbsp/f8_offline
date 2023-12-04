import cities from "./tinh_tp.json"

export function GET() {
  return Response.json({ data: cities })
}
