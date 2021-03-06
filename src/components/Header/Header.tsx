import { makeStyles, Typography, TypographyProps, useTheme } from '@material-ui/core'
import React from 'react'
import { Flex, FlexProps } from '../Flex'

interface HeaderProps extends TypographyProps {
  title: string,
  subtitle: string,
  align?: 'center' | 'left' | 'right'
  flexProps?: FlexProps
  subHeaderProps?: TypographyProps
}

const useStyles = makeStyles((theme) => ({
  subtitle: {
    color: theme.palette.primary.light
  }
}))

export const Header: React.FC<HeaderProps> = ({ 
  title,
  subtitle,
  flexProps,
  align,
  // children,
  subHeaderProps,
  ...props
}) => {
  const classes = useStyles()

  return (
    <Flex mb={3} column {...flexProps}>
      <Typography variant="h4" color="primary" align={align} {...props}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h5" className={classes.subtitle} align={align || 'center'} {...subHeaderProps}>{subtitle}</Typography>
      )}
    </Flex>
    
  )
}
