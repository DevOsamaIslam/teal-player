import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react"
import { useSmartValue } from "use-smartvalue"
import { IPlayerState } from "./types"
import { IVideoPlayerContext, VideoPlayerContext } from "./usePlayer"

export const VideoPlayerProvider: FC<PropsWithChildren> = ({ children }) => {
  const playerState = useSmartValue<IPlayerState>({
    initialValue: {
      play: false,
      pause: true,
      fullscreen: false,
      video: undefined,
      captionsOn: false,
      captionsFile: undefined,
      controlsVisible: true,
    },
  })

  const player = playerState.get()

  const volumeState = useSmartValue<number>({ initialValue: 50 })

  const videoRef = useRef<HTMLVideoElement>(null)

  const captionsRef = useRef<HTMLTrackElement>(null)

  const containerRef = useRef<HTMLDivElement>(null)

  const onPause = useCallback(() => {
    if (!player.video) return
    playerState.set((prev) => ({
      ...prev,
      pause: true,
      play: false,
    }))
    videoRef.current?.pause()
  }, [playerState])

  const onPlay = useCallback(() => {
    if (!player.video) return
    playerState.set((prev) => ({
      ...prev,
      pause: false,
      play: true,
    }))
    videoRef.current?.play()
  }, [playerState])

  const toggleVideo = useCallback(() => {
    if (!player.video) return
    if (player.play) onPause()
    else onPlay()
  }, [playerState, onPause, onPlay])

  const setVolume = useCallback(
    (volume: number) => {
      volumeState.set(volume)
      if (videoRef.current) videoRef.current.volume = volume / 100
    },
    [volumeState]
  )

  const toggleCaption = useCallback(() => {
    if (!player.video) return
    playerState.set((prev) => {
      if (videoRef.current) {
        videoRef.current.textTracks[0].mode = prev.captionsOn
          ? "hidden"
          : "showing"
      }
      return {
        ...prev,
        captionsOn: !prev.captionsOn,
      }
    })
  }, [playerState])

  const toggleFullscreen = useCallback(() => {
    if (!player.video) return
    playerState.set((prev) => {
      if (prev.fullscreen) {
        document.exitFullscreen()
      } else containerRef.current?.requestFullscreen()
      return {
        ...prev,
        fullscreen: !player.fullscreen,
      }
    })
  }, [playerState])

  const loadVideo = useCallback(
    (file: FileList | null) => {
      if (!file) return
      const videoFile = file[0]
      playerState.set((prev) => ({
        ...prev,
        video: videoFile,
      }))

      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(videoFile)
      }
    },
    [playerState]
  )

  const loadCaptions = useCallback(
    async (file: FileList | null) => {
      if (!file?.[0]) return

      const captionFile = file[0]
      playerState.set((prev) => ({
        ...prev,
        captionsFile: captionFile,
      }))

      if (captionsRef.current) {
        captionsRef.current.src = URL.createObjectURL(captionFile)
      }
    },
    [playerState]
  )

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const showControls = () => {
      // Show controls if they are not already visible
      if (!player.controlsVisible) {
        playerState.set((prev) => ({
          ...prev,
          controlsVisible: true,
        }))
      }

      // Clear the previous timeout to reset the idle timer
      clearTimeout(timeoutId)

      // Set a new timeout to hide the controls after 2 seconds of no activity
      timeoutId = setTimeout(() => {
        if (player.controlsVisible) {
          playerState.set((prev) => ({
            ...prev,
            controlsVisible: false,
          }))
        }
      }, 2000)
    }

    // Attach the mousemove event listener only when the video is playing
    if (player.video && player.play)
      containerRef.current?.addEventListener("mousemove", showControls)

    return () => {
      // Cleanup event listener and timeout
      containerRef.current?.removeEventListener("mousemove", showControls)
      clearTimeout(timeoutId)
    }
  }, [containerRef, playerState])

  const contextValues: IVideoPlayerContext = useMemo(
    () => ({
      playerState,
      volumeState,
      videoRef,
      captionsRef,
      onPause,
      onPlay,
      setVolume,
      toggleVideo,
      toggleCaption,
      toggleFullscreen,
      loadVideo,
      loadCaptions,
    }),
    [
      playerState,
      volumeState,
      videoRef,
      captionsRef,
      onPause,
      onPlay,
      setVolume,
      toggleVideo,
      toggleCaption,
      toggleFullscreen,
      loadVideo,
      loadCaptions,
    ]
  )

  return (
    <VideoPlayerContext.Provider value={contextValues}>
      <div ref={containerRef}>{children}</div>
    </VideoPlayerContext.Provider>
  )
}
