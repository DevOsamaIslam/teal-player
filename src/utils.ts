import { format } from "date-fns"

export const formatDuration = (seconds: number | null | undefined) => {
  if (!seconds) return ""
  const time = {
    hours: Math.floor(seconds / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  }

  if (time.hours > 0) {
    return format(
      new Date(0, 0, 0, time.hours, time.minutes, time.seconds),
      "HH:mm:ss"
    )
  } else {
    return format(new Date(0, 0, 0, 0, time.minutes, time.seconds), "mm:ss")
  }
}
