import { ClosedCaption, UploadFile } from '@mui/icons-material'
import { Button, styled, Typography } from '@mui/material'
import { FC } from 'react'
import { useVidePlayer } from '../../control/usePlayer'
import { HiddenInput } from '../shared/HiddenInput'
import Space from '../shared/Space'
import SpaceBetween from '../shared/SpaceBetween'

const StyledToolbar = styled(SpaceBetween)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  background: `linear-gradient(to bottom, ${theme.palette.primary.dark}, transparent)`,
  height: '7vh',
  display: 'flex',
  alignItems: 'center',
  columnGap: 2,
  paddingInline: 8,
}))

const Toolbar: FC = () => {
  const { loadVideo, loadCaptions, playerState } = useVidePlayer()

  const { video } = playerState.get()

  return (
    <StyledToolbar>
      <div>{video && <Typography color="white">{video.name}</Typography>}</div>
      <Space>
        <Button
          component="label"
          size="small"
          variant="text"
          tabIndex={-1}
          color="secondary"
          startIcon={<UploadFile />}
        >
          Upload video
          <HiddenInput type="file" onChange={event => loadVideo(event.target.files)} accept="" />
        </Button>

        <Button
          component="label"
          size="small"
          variant="text"
          tabIndex={-1}
          color="secondary"
          startIcon={<ClosedCaption />}
        >
          <HiddenInput
            type="file"
            onChange={event => {
              loadCaptions(event.target.files)
            }}
            name="caption"
            accept=".srt, .vtt, .ass, .ssa, .sbv"
          />
        </Button>
      </Space>
    </StyledToolbar>
  )
}

export default Toolbar
