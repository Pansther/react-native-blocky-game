import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { MainContext } from '../../contexts/main'

import { getRank } from './BlockyContainer'

const Ending = () => {
  const {
    setMainState,
    mainState: { score },
  } = useContext(MainContext)

  const onMenu = () => {
    setMainState({ currentState: 'start' })
  }

  const onRestart = () => {
    setMainState({ currentState: 'playing' })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Your score is {score}</Text>
      <Text style={styles.rank}>Rank {getRank(score)}</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ marginRight: 10 }}>
          <Button title="Restart" onPress={onRestart} />
        </View>
        <View>
          <Button title="Menu" onPress={onMenu} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  score: {
    fontSize: 24,
    marginBottom: 20,
  },
  rank: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})

export default Ending
