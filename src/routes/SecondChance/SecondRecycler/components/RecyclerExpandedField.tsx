import { Box, TextField } from '@material-ui/core'
import React from 'react'
import { Flex } from '../../../../components/Flex'

interface RecyclerExpandedFieldProps {
  data?:string;
  placeholder?:string;
  label?:string;
  topIcon:React.ReactNode
}

export const RecyclerExpandedField: React.FC<RecyclerExpandedFieldProps> = ({
  data,
  label,
  placeholder,
  topIcon
}) => {
  return (
    <Box>
      <Flex center my={1}>
        {topIcon}
      </Flex>
      <TextField
        id={label}
        value={data || ''}
        type="number"
        label={label || ''}
        placeholder={placeholder || ''}
        variant="outlined"
        fullWidth
        disabled
      />
    </Box>
  )
}
      