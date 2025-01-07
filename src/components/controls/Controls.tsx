import {
  ClosedCaption,
  ClosedCaptionOutlined,
  Fullscreen,
  FullscreenExit,
} from '@mui/icons-material'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { IconButton, styled } from '@mui/material'
import { FC } from 'react'
import { useVidePlayer } from '../../control/usePlayer'
import Space from '../shared/Space'
import SpaceBetween from '../shared/SpaceBetween'
import VolumeSlider from './VolumeSlider'
import Duration from './Duration'
import Timeline from './Timeline'

const Container = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  height: '7vh',
  width: '100vw',
  backgroundColor: 'transparent',
  paddingInline: 16,
}))

const Controls: FC = () => {
  const { playerState, onPause, onPlay, toggleCaptions, toggleFullscreen } = useVidePlayer()

  const { play, pause, captionsOn, fullscreen } = playerState.get()

  return (
    <Container>
      <Timeline />
      <SpaceBetween>
        <Space>
          {pause && (
            <IconButton color="primary" onClick={onPlay}>
              <PlayArrowIcon />
            </IconButton>
          )}
          {play && (
            <IconButton color="primary" onClick={onPause}>
              <PauseIcon />
            </IconButton>
          )}

          <VolumeSlider />
          <Duration />
        </Space>
        <Space>
          <IconButton color="primary" onClick={toggleCaptions}>
            {captionsOn && <ClosedCaption />}
            {!captionsOn && <ClosedCaptionOutlined />}
          </IconButton>
          <IconButton color="primary" onClick={toggleFullscreen}>
            {!fullscreen && <Fullscreen />}
            {fullscreen && <FullscreenExit />}
          </IconButton>
        </Space>
      </SpaceBetween>
    </Container>
  )
}

export default Controls
