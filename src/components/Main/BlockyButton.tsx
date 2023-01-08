import React, { useRef } from 'react'
import { Animated, Easing, Image, View } from 'react-native'
import { useEffectOnce } from 'react-use'

import { BlockyButtonView } from './styles'

export enum BlockButtonType {
  red = 1,
  yellow,
  green,
  blue,
  bomb,
  // shuffle,
  // random,
  blank,
}

export interface BlockyButtonProps {
  id: string
  type: BlockButtonType
  onPress?: () => void
}

const getBlockyImage = (type: BlockButtonType) => {
  switch (type) {
    case BlockButtonType.blank:
      return require('../../assets/x-button.png')
    case BlockButtonType.bomb:
      return require('../../assets/bomb.png')
    // case BlockButtonType.shuffle:
    //   return require('../../assets/shuffle.png')
    // case BlockButtonType.random:
    //   return require('../../assets/dices.png')
    case BlockButtonType.red:
      return require('../../assets/strawberry.png')
    case BlockButtonType.yellow:
      return require('../../assets/bananas.png')
    case BlockButtonType.green:
      return require('../../assets/apple.png')
    case BlockButtonType.blue:
      return require('../../assets/blueberry.png')
    default:
      return require('../../assets/x-button.png')
  }
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
    <View>
      <Animated.View
        style={{
          zIndex: 10,
          transform: [
            {
              scale: appearAnim,
            },
          ],
        }}
      >
        <BlockyButtonView type={type} onPress={onPress}>
          <Image
            source={getBlockyImage(type)}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </BlockyButtonView>
      </Animated.View>
    </View>
  )
}

export default BlockyButton
