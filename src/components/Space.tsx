import React, { CSSProperties } from "react"

interface ISpaceProps {
  children: React.ReactNode
  direction?: "horizontal" | "vertical"
  gap?: number
  justify?: CSSProperties["justifyContent"]
  align?: CSSProperties["alignItems"]
  className?: string
}

const Space: React.FC<ISpaceProps> = ({
  children,
  direction = "horizontal",
  gap = 8,
  justify = "start",
  align = "center",
  className = "",
}) => {
  const styles: React.CSSProperties = {
    display: "flex",
    flexDirection: direction === "horizontal" ? "row" : "column",
    gap: `${gap}px`,
    justifyContent: justify,
    alignItems: align,
  }

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  )
}

export default Space
