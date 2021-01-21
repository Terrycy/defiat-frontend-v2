import { Divider, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: theme.palette.primary.light,
    height: '2px',
    width: '90%',
    marginBottom: theme.spacing(1)
    // borderRadius: '1px',
    // paddingLeft: '2px',
    // paddingRight:'2px'
  }
}))

interface TextDecorationProps {
  width?: string
}

export const TextDecoration: React.FC<TextDecorationProps> = ({
  width
}) => {
  const classes = useStyles()
  return (
    // <Flex marginX={1}>
    <Divider
      variant='fullWidth'
      className={classes.divider}
      style={!!width ? {width} : undefined}
    />
    // </Flex>
    
  )
}
