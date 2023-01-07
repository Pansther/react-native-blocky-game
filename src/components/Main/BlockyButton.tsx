import React, { useRef } from 'react'
import { Text, Animated, Easing } from 'react-native'
import { useEffectOnce } from 'react-use'

import { BlockyButtonView } from './styles'

export enum BlockButtonType {
  blank,
  red,
  green,
  blue,
}

export interface BlockyButtonProps {
  id: string
  type: BlockButtonType
  onPress?: () => void
}

const BlockyButton = ({ type, onPress }: BlockyButtonProps) => {
  const appearAnim = useRef(new Animated.Value(0.6)).current

  useEffectOnce(() => {
    Animated.timing(appearAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  })
  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: appearAnim,
          },
        ],
      }}
    >
      <BlockyButtonView type={type} onPress={onPress}>
        <Text>{type}</Text>
      </BlockyButtonView>
    </Animated.View>
  )
}

export default BlockyButton
