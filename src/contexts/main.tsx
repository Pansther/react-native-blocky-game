import { createContext } from 'react'

export type MainCurrentStateType = 'start' | 'playing' | 'ending'

export interface MainStateType {
  currentState: 'start' | 'playing' | 'ending'
}

export interface MainContextType {
  mainState: MainStateType
  setMainState: (
    state:
      | Partial<MainStateType>
      | ((prevState: MainStateType) => Partial<MainStateType>)
  ) => void
}

export const MainContext = createContext<MainContextType>({} as MainContextType)
