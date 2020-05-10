import React from 'react'
import clsx from 'clsx'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

type Props = {
  className?: string
} & TextFieldProps

const Input = ({ className, ...props }: Props) => <TextField classes={{ root: clsx(className) }} {...props} />

export default Input
