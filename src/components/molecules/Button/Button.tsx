import React from 'react'
import clsx from 'clsx'
import MButton, { ButtonProps } from '@material-ui/core/Button'

type Props = {
  className?: string
} & ButtonProps

const Button = ({ className, children, ...props }: Props) => (
  <MButton classes={{ root: clsx(className) }} {...props}>
    {children}
  </MButton>
)

export default Button
