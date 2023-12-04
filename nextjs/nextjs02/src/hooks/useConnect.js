import { toast } from "sonner"
import { WifiOffIcon, WifiIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function useConnect() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true)
      toast.success("Đã khôi phục kết nối internet", {
        icon: <WifiIcon width={20} height={20} />,
      })
    }

    function offlineHandler() {
      setIsOnline(false)
      toast.warning("Bạn đang offline", {
        icon: <WifiOffIcon width={20} height={20} />,
      })
    }

    window.addEventListener("online", onlineHandler)
    window.addEventListener("offline", offlineHandler)

    return () => {
      window.removeEventListener("online", onlineHandler)
      window.removeEventListener("offline", offlineHandler)
    }
  }, [])

  return isOnline
}
