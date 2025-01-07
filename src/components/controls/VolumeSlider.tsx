import React, { useState } from "react"
import { Box, Slider, IconButton } from "@mui/material"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import VolumeDownIcon from "@mui/icons-material/VolumeDown"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import { useVidePlayer } from "../../control/usePlayer"

const VolumeSlider: React.FC = () => {
  const { volumeState, setVolume } = useVidePlayer()

  const volume = volumeState.get()

  const [hover, setHover] = useState(false)

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeOffIcon />
    if (volume <= 50) return <VolumeDownIcon />
    return <VolumeUpIcon />
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      position="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{
        width: "180px",
        height: "40px",
      }}>
      <IconButton
        onClick={() => {
          setVolume(volume > 0 ? 0 : volumeState.getPrevious()!)
        }}
        sx={{ zIndex: 1 }}
        color="primary">
        {getVolumeIcon()}
      </IconButton>
      <Box
        position="absolute"
        top={0}
        left="40px"
        display="flex"
        alignItems="center"
        height="100%"
        sx={{
          transition: "opacity 0.3s",
          opacity: hover ? 1 : 0,
          width: "120px",
        }}>
        <Slider
          value={volume}
          onChange={(_, volume) => setVolume(volume as number)}
          min={0}
          max={100}
          step={1}
          sx={{
            ml: 1,
            "& .MuiSlider-thumb": {
              width: "12px",
              height: "12px",
            },
            "& .MuiSlider-rail": {
              height: "4px",
            },
            "& .MuiSlider-track": {
              height: "4px",
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default VolumeSlider
