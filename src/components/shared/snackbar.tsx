// message.ts
import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material'
import { ReactElement, useState } from 'react'
import { createRoot } from 'react-dom/client'

type Message = Record<
  NonNullable<AlertProps['severity']>,
  (snackbarProps: SnackbarProps, messageProps: AlertProps) => void
>

export const snackbar: Message = {
  success: (snackbarProps: SnackbarProps, messageProps: AlertProps) => {
    return snackBarNode(snackbarProps, <Alert {...messageProps} severity="success" />)
  },
  error: (snackbarProps: SnackbarProps, messageProps: AlertProps) => {
    return snackBarNode(snackbarProps, <Alert {...messageProps} severity="error" />)
  },
  info: (snackbarProps: SnackbarProps, messageProps: AlertProps) => {
    return snackBarNode(snackbarProps, <Alert {...messageProps} severity="info" />)
  },
  warning: (snackbarProps: SnackbarProps, messageProps: AlertProps) => {
    return snackBarNode(snackbarProps, <Alert {...messageProps} severity="warning" />)
  },
}

const defaultMessageOptions: SnackbarProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  autoHideDuration: 3 * 1000,
  disableWindowBlurListener: true,
}

const snackBarNode = (options: SnackbarProps, children: ReactElement) => {
  return createRoot(document.querySelector('#snackbar')!).render(
    <Snack options={{ ...defaultMessageOptions, ...options }} children={children} />,
  )
}

const Snack = (props: { options: SnackbarProps; children: ReactElement }) => {
  const [open, setOpen] = useState(true)

  return (
    <Snackbar
      {...props.options}
      children={props.children}
      open={open}
      onClose={(...args) => {
        setOpen(false)
        props.options.onClose?.(...args)
      }}
    />
  )
}
