import { styled } from "@mui/material"

const Video = styled("video")(({ theme }) => ({
  position: "absolute",
  top: 0,
  zIndex: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "black",
  color: theme.palette.primary.main,
}))

export default Video
