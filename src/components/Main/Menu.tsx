import React, { useContext } from 'react'
import { View, Text, Button } from 'react-native'

import { MainContext } from '../../contexts/main'

const Menu = () => {
  const { setMainState } = useContext(MainContext)

  return (
    <View>
      <Text>Menu</Text>
      <Button
        title="Start"
        onPress={() => setMainState({ currentState: 'playing' })}
      />
    </View>
  )
}

export default Menu
