import { FC } from "react"
import { useVidePlayer } from "../control/usePlayer"
import Controls from "./controls/Controls"
import Toolbar from "./controls/Toolbar"
import Video from "./Video"

const Player: FC = () => {
  const { videoRef, toggleVideo, captionsRef, playerState, toggleFullscreen } =
    useVidePlayer()

  const { controlsVisible } = playerState.get()

  return (
    <>
      {controlsVisible && <Toolbar />}
      <Video
        ref={videoRef}
        controls={false}
        onDoubleClick={toggleFullscreen}
        onClick={toggleVideo}>
        <track kind="captions" ref={captionsRef} />
      </Video>
      {controlsVisible && <Controls />}
    </>
  )
}

export default Player
