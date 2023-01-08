import { createContext } from 'react'

import { BlockyButtonProps } from '../components/Main/BlockyButton'

export interface BlockyStateType {
  move: number
  count: number
  score: number
  maxMove: number
  datas: BlockyButtonProps[][]
}

export interface BlockyContextType {
  blockyState: BlockyStateType
  setBlockyState: (
    state:
      | Partial<BlockyStateType>
      | ((prevState: BlockyStateType) => Partial<BlockyStateType>)
  ) => void
}

export const BlockyContainerContext = createContext<BlockyContextType>(
  {} as BlockyContextType
)
