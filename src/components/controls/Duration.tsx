import { FC, memo, useEffect, useRef, useState } from 'react'
import Space from '../shared/Space'
import { useVidePlayer } from '../../control/usePlayer'
import { formatDuration } from '../../utils'

const Duration: FC = () => {
  const { videoRef, playerState } = useVidePlayer()
  const { video } = playerState.get()
  const [duration, setDuration] = useState<string>(formatDuration(videoRef.current?.duration))

  const currentTimeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeUpdate = () => {
      if (currentTimeRef.current)
        currentTimeRef.current.textContent = formatDuration(videoRef.current?.currentTime) || '-'
    }
    videoRef.current?.addEventListener('timeupdate', timeUpdate)

    const getDuration = () => {
      // @ts-expect-error ...
      if (!isNaN(videoRef.current?.duration)) {
        setDuration(formatDuration(videoRef.current?.duration))
      }
    }

    videoRef.current?.addEventListener('loadeddata', getDuration)

    return () => {
      videoRef.current?.addEventListener('loadeddata', timeUpdate)
      videoRef.current?.addEventListener('loadeddata', getDuration)
    }
  }, [video, videoRef])

  return (
    <Space>
      <div ref={currentTimeRef}>-</div>
      <div>/</div>
      {duration || '-'}
    </Space>
  )
}

export default memo(Duration)
