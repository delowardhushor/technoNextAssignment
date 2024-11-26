import { View } from 'react-native'
import React from 'react'

const Spacing = ({ vertical, horizontal}) => {
  return (
    <View
        style={{ width: horizontal || 1, height: vertical || 1 }}
    />
  )
}

export default Spacing