import styled from 'styled-components/native'
import { BlockButtonType, BlockyButtonProps } from './BlockyButton'

export const MainContainer = styled.View``

export const BlockyContainerView = styled.View`
  display: flex;
  flex-direction: row;
`

export const BlockyButtonView = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<Pick<BlockyButtonProps, 'type'>>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ type }) => getBlockyColor(type)}
`

const getBlockyColor = (type: BlockButtonType) => {
  switch (type) {
    case BlockButtonType.red:
      return 'background-color: salmon;'
    case BlockButtonType.green:
      return 'background-color: limegreen;'
    case BlockButtonType.blue:
      return 'background-color: deepskyblue;'
    default:
      return 'background-color: black;'
  }
}
