import React, { useContext, useEffect, useRef } from 'react'
import { Button, Text } from 'react-native'
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

import { MainContext } from '../../contexts/main'
import { BlockyContainerContext, BlockyStateType } from '../../contexts/blocky'

interface BlockyContainerProps {
  count?: number
  maxMove?: number
}

const generateBlocky = () => {
  return {
    id: nanoid(),
    // type: random(BlockButtonType.red, BlockButtonType.blank)
    type:
      random(0, 100) <= 97
        ? random(BlockButtonType.red, BlockButtonType.blue)
        : random(BlockButtonType.bomb, BlockButtonType.blank),
  }
}

export const generateBlockyRow = (count = 6): BlockyButtonProps[] => {
  return times(count, () => generateBlocky())
}

export const generateBlockyList = (count = 6): BlockyButtonProps[][] => {
  return new Array(count).fill(0).map(() => generateBlockyRow(count))
}

const BlockyContainer = ({ maxMove, count }: BlockyContainerProps) => {
  const { setMainState } = useContext(MainContext)

  const [state, setState] = useSetState<BlockyStateType>({
    score: 0,
    datas: [],
    count: count ?? 6,
    move: maxMove ?? 20,
    maxMove: maxMove ?? 20,
  })

  const pressCooldown = useRef(false)
  const routes = useRef<number[][]>([])

  const resetRoutes = (count = 6) => {
    routes.current = new Array(count)
      .fill(0)
      .map(() => times(count, constant(0)))
  }

  const onPressBlockyButton = ({
    row,
    col,
    blocky,
  }: {
    row: number
    col: number
    blocky: BlockyButtonProps
  }) => {
    if (pressCooldown.current) return
    if (state.move <= 0) return

    pressCooldown.current = true
    setTimeout(() => {
      pressCooldown.current = false
    }, 300)

    resetRoutes(state.count)

    if (
      blocky.type >= BlockButtonType.bomb &&
      blocky.type <= BlockButtonType.blank
    ) {
      onPressSpecialBlock({ row, col, type: blocky.type })
    } else {
      calculateBlockyArea({ ...blocky, row, col })
    }

    onAfterPressBlockyButton({ ...blocky })
  }

  const calculateBlockyArea = ({
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
    // console.log('direction row, col', direction, row, col)

    routes.current[row][col] = type

    if (
      direction !== 'bottom' &&
      routes.current?.[row - 1]?.[col] === 0 &&
      state.datas?.[row - 1]?.[col]?.type === type
    ) {
      calculateBlockyArea({ row: row - 1, col, type, direction: 'top' })
    }
    if (
      direction !== 'left' &&
      routes.current?.[row]?.[col + 1] === 0 &&
      state.datas?.[row]?.[col + 1]?.type === type
    ) {
      calculateBlockyArea({ row, col: col + 1, type, direction: 'right' })
    }
    if (
      direction !== 'top' &&
      routes.current?.[row + 1]?.[col] === 0 &&
      state.datas?.[row + 1]?.[col]?.type === type
    ) {
      calculateBlockyArea({ row: row + 1, col, type, direction: 'bottom' })
    }
    if (
      direction !== 'right' &&
      routes.current?.[row]?.[col - 1] === 0 &&
      state.datas?.[row]?.[col - 1]?.type === type
    ) {
      calculateBlockyArea({ row, col: col - 1, type, direction: 'left' })
    } else return
  }

  const onPressSpecialBlock = ({
    row,
    col,
    type,
  }: {
    row: number
    col: number
    type: BlockButtonType
  }) => {
    switch (type) {
      case BlockButtonType.bomb:
        const bombOffset = 2
        const lowerRow = row - bombOffset >= 0 ? row - bombOffset : 0
        const upperRow =
          row + bombOffset > state.count ? state.count : row + bombOffset
        const lowerCol = col - bombOffset >= 0 ? col - bombOffset : 0
        const upperCol =
          col + bombOffset > state.count ? state.count : col + bombOffset

        routes.current = routes.current.map((rows, row) => {
          return rows.map((_, col) => {
            if (row >= lowerRow && row <= upperRow) {
              if (col >= lowerCol && col <= upperCol) return 1
            }
            return 0
          })
        })
        break
      case BlockButtonType.blank:
      default:
        break
    }
  }

  const calculateScore = (type: BlockButtonType) => {
    let amount = 0

    routes.current.map((rows) => {
      rows.map((blockyType) => {
        if (blockyType !== 0) amount += 1
      })
    })

    return amount * 1
    // return amount * type
  }

  const setNewDatas = (newScore: number) => {
    const newDatas = routes.current.map((rows, row) => {
      return rows.map((blockyType, col) => {
        if (blockyType === 0) return state.datas?.[row]?.[col]
        return {
          ...state.datas?.[row]?.[col],
          ...generateBlocky(),
        }
      })
    })

    setState(({ move, score }) => ({
      move: move - 1,
      datas: newDatas,
      score: score + newScore,
    }))
  }

  const onAfterPressBlockyButton = ({ type }: { type: BlockButtonType }) => {
    const score = calculateScore(type)
    setNewDatas(score)
  }

  useEffectOnce(() => {
    resetRoutes(state.count)
    setState({
      datas: generateBlockyList(state.count),
    })
  })

  useEffect(() => {
    if (state.move <= 0) {
      setTimeout(() => {
        setMainState({ currentState: 'ending' })
      }, 1000)
    }
  }, [state.move])

  return (
    <BlockyContainerContext.Provider
      value={{ blockyState: state, setBlockyState: setState }}
    >
      <Text>score: {state.score}</Text>
      <Text>move: {state.move}</Text>
      {state?.datas?.map((rows, row) => (
        <BlockyContainerView key={row}>
          {rows.map((blocky, col) => (
            <BlockyButton
              {...blocky}
              key={blocky.id}
              onPress={() => onPressBlockyButton({ row, col, blocky })}
            />
          ))}
        </BlockyContainerView>
      ))}
      <Button
        title="Random"
        onPress={() =>
          setState({
            datas: generateBlockyList(state.count),
          })
        }
      />
    </BlockyContainerContext.Provider>
  )
}

export default BlockyContainer
