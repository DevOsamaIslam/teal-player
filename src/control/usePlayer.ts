import { SmartValue } from "use-smartvalue"
import { IPlayerState } from "./types"
import { createContext, RefObject, useContext } from "react"

export interface IVideoPlayerContext {
  playerState: SmartValue<IPlayerState>
  volumeState: SmartValue<number>
  onPause: () => void
  onPlay: () => void
  setVolume: (volume: number) => void
  toggleVideo: () => void
  toggleCaption: () => void
  toggleFullscreen: () => void
  loadVideo: (file: FileList | null) => void
  loadCaptions: (file: FileList | null) => void
  videoRef: RefObject<HTMLVideoElement>
  captionsRef: RefObject<HTMLTrackElement>
}
export const VideoPlayerContext = createContext<IVideoPlayerContext>({} as any)

export const useVidePlayer = () => useContext(VideoPlayerContext)
