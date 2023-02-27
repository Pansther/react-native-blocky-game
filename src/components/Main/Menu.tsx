import React, { useContext } from 'react'
import { Text, Button, StyleSheet } from 'react-native'

import { MenuContainer } from './styles'

import { MainContext } from '../../contexts/main'

const Menu = () => {
  const { setMainState } = useContext(MainContext)

  return (
    <MenuContainer>
      <Text style={styles.header}>React Native Blocky Game</Text>
      <Button
        title="Start"
        onPress={() => setMainState({ currentState: 'playing' })}
      />
    </MenuContainer>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    maxWidth: 240,
    textAlign: 'center',
  },
})

export default Menu
