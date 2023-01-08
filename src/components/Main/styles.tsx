import styled from 'styled-components/native'

import { BlockyButtonProps } from './BlockyButton'

export const MainContainer = styled.View``

export const BlockyContainerView = styled.View`
  display: flex;
  flex-direction: row;
`

export const BlockyButtonFrame = styled.Image`
  z-index: 1;
  width: 49px;
  height: 60px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
`

export const BlockyButtonView = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<Pick<BlockyButtonProps, 'type'>>`
  width: 40px;
  height: 40px;
  /* padding: 15px; */
  display: flex;
  align-items: center;
  justify-content: center;
`
