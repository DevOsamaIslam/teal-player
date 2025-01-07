import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { ThemeProvider } from "@mui/material"
import theme from "./app/theme"
import { VideoPlayerProvider } from "./control/Context.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <VideoPlayerProvider>
        <App />
      </VideoPlayerProvider>
    </ThemeProvider>
  </StrictMode>
)
