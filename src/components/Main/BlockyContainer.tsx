import React, { useRef } from 'react'
import { Button } from 'react-native'
import { nanoid } from 'nanoid'
import times from 'lodash/times'
import random from 'lodash/random'
import constant from 'lodash/constant'
import { useEffectOnce, useSetState } from 'react-use'

import BlockyButton, {
  BlockButtonType,
  BlockyButtonProps,
} from './BlockyButton'
import { BlockyContainerView } from './styles'

import { BlockyContainerContext, BlockyStateType } from '../../contexts/blocky'

export const generateBlockyRow = (count = 6): BlockyButtonProps[][] => {
  return [
    times(count, () => ({
      id: nanoid(),
      type: random(BlockButtonType.red, BlockButtonType.blue),
    })),
  ]
}

export const generateBlockyList = (): BlockyButtonProps[][] => {
  return [
    ...generateBlockyRow(),
    ...generateBlockyRow(),
    ...generateBlockyRow(),
    ...generateBlockyRow(),
    ...generateBlockyRow(),
    ...generateBlockyRow(),
  ]
}

const BlockyContainer = () => {
  const [state, setState] = useSetState<BlockyStateType>({
    datas: [],
  })

  const routes = useRef<number[][]>([])

  const resetRoutes = () => {
    routes.current = [...new Array(6).fill(0).map(() => times(6, constant(0)))]
  }

  const onPressBlockyButton = ({
    row,
    col,
    type,
    direction,
  }: {
    row: number
    col: number
    type: BlockButtonType
    direction?: 'top' | 'right' | 'bottom' | 'left'
  }) => {
    if (type === BlockButtonType.blank) return

    // console.log('direction row, col', direction, row, col)

    routes.current[row][col] = type

    if (
      direction !== 'bottom' &&
      routes.current?.[row - 1]?.[col] === 0 &&
      state.datas?.[row - 1]?.[col]?.type === type
    ) {
      onPressBlockyButton({ row: row - 1, col, type, direction: 'top' })
    }
    if (
      direction !== 'left' &&
      routes.current?.[row]?.[col + 1] === 0 &&
      state.datas?.[row]?.[col + 1]?.type === type
    ) {
      onPressBlockyButton({ row, col: col + 1, type, direction: 'right' })
    }
    if (
      direction !== 'top' &&
      routes.current?.[row + 1]?.[col] === 0 &&
      state.datas?.[row + 1]?.[col]?.type === type
    ) {
      onPressBlockyButton({ row: row + 1, col, type, direction: 'bottom' })
    }
    if (
      direction !== 'right' &&
      routes.current?.[row]?.[col - 1] === 0 &&
      state.datas?.[row]?.[col - 1]?.type === type
    ) {
      onPressBlockyButton({ row, col: col - 1, type, direction: 'left' })
    } else {
      return
    }
  }

  const onAfterPressBlockyButton = () => {
    const newDatas = routes.current.map((rows, row) => {
      return rows.map((blockyType, col) => {
        if (blockyType === 0) return state.datas?.[row]?.[col]
        return {
          ...state.datas?.[row]?.[col],
          id: nanoid(),
          type: random(1, 3),
        }
      })
    })

    setState({ datas: newDatas })
  }

  useEffectOnce(() => {
    resetRoutes()
    setState({
      datas: generateBlockyList(),
    })
  })

  //   console.log('state :>> ', state)

  return (
    <BlockyContainerContext.Provider
      value={{ blockyState: state, setBlockyState: setState }}
    >
      {state?.datas?.map((rows, row) => (
        <BlockyContainerView key={row}>
          {rows.map((blocky, col) => (
            <BlockyButton
              {...blocky}
              key={blocky.id}
              onPress={() => {
                resetRoutes()
                onPressBlockyButton({ ...blocky, row, col })
                onAfterPressBlockyButton()
              }}
            />
          ))}
        </BlockyContainerView>
      ))}
      <Button
        onPress={() =>
          setState({
            datas: generateBlockyList(),
          })
        }
        title="Random"
      />
    </BlockyContainerContext.Provider>
  )
}

export default BlockyContainer
