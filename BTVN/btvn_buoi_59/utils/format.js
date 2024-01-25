import { format, formatDistanceToNow } from "date-fns"
import vi from "date-fns/locale/vi"

export function formatDate(data, dataString = "d 'thg' L yyyy") {
  return format(new Date(data), dataString, { locale: vi })
}

export function formatToNow(data) {
  return formatDistanceToNow(new Date(data), { locale: vi, addSuffix: true })
}
