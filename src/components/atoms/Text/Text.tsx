import React from 'react'
import clsx from 'clsx'
import Typography, { TypographyProps } from '@material-ui/core/Typography'

type Props = {
  className?: string
} & TypographyProps

const Text = ({ className, children, ...props }: Props) => (
  <Typography classes={{ root: clsx(className) }} {...props}>
    {children}
  </Typography>
)

export default Text
