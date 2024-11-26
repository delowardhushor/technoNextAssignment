import { View } from 'react-native'
import React from 'react'
import { useTheme } from '../themes'

const Hr = ({}) => {
  const {colors} = useTheme()
  return (
    <View
        style={{ height:1, backgroundColor:colors.border, borderRadius:1 }}
    />
  )
}

export default Hr