import React from 'react'
import { useSetState } from 'react-use'

import Menu from './Menu'
import { MainContainer } from './styles'
import BlockyContainer from './BlockyContainer'

import {
  MainContext,
  type MainStateType,
  type MainCurrentStateType,
} from '../../contexts/main'

const getChildren = ({
  currentState,
}: {
  currentState: MainCurrentStateType
}) => {
  switch (currentState) {
    case 'playing':
      return <BlockyContainer />
    case 'start':
    case 'ending':
    default:
      return <Menu />
  }
}

const Main = () => {
  const [state, setState] = useSetState<MainStateType>({
    currentState: 'playing',
    // currentState: 'start',
  })

  return (
    <MainContext.Provider value={{ mainState: state, setMainState: setState }}>
      <MainContainer>
        {getChildren({ currentState: state.currentState })}
      </MainContainer>
    </MainContext.Provider>
  )
}

export default Main
