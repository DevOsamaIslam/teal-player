import { Slider } from "@mui/material"
import { FC, memo, useEffect, useState } from "react"
import { useVidePlayer } from "../../control/usePlayer"

const Timeline: FC = () => {
  const { videoRef } = useVidePlayer()
  const [value, setValue] = useState(0)

  useEffect(() => {
    const updatePercentage = () => {
      if (!videoRef.current) return

      const percentage = Math.floor(
        (videoRef.current.currentTime / videoRef.current.duration) * 100
      )
      setValue(percentage)
    }
    videoRef.current?.addEventListener("timeupdate", updatePercentage)
  }, [videoRef])

  return (
    <Slider
      value={value}
      style={{ padding: 0 }}
      min={0}
      max={100}
      step={0.01}
      onChange={(_, value) => {
        if (!videoRef.current || typeof value !== "number") return
        videoRef.current.currentTime = (value / 100) * videoRef.current.duration
      }}
    />
  )
}

export default memo(Timeline)
