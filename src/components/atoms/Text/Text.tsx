import React from 'react'
import Typography, { TypographyProps } from '@material-ui/core/Typography'

const Text = ({ children, ...props }: TypographyProps) => <Typography {...props}>{children}</Typography>

export default Text
