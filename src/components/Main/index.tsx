import React from 'react'
import { useSetState } from 'react-use'

import Menu from './Menu'
import Ending from './Ending'
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
    case 'ending':
      return <Ending />
    case 'start':
    default:
      return <Menu />
  }
}

const Main = () => {
  const [state, setState] = useSetState<MainStateType>({
    score: 0,
    currentState: 'start',
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
