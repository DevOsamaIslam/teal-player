import { CSSProperties, FC, HTMLAttributes } from "react"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  style?: CSSProperties
  gap?: CSSProperties["columnGap"]
}
const SpaceBetween: FC<IProps> = ({ style, gap = 2, children, ...rest }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: gap,
        width: "100%",
        ...style,
      }}
      {...rest}>
      {children}
    </div>
  )
}

export default SpaceBetween
