export interface IPlayerState {
  play: boolean
  pause: boolean
  fullscreen: boolean
  video: File | undefined
  captionsFile: File | undefined
  captionsOn: boolean
  controlsVisible: boolean
}
