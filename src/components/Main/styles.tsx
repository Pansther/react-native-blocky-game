import styled from 'styled-components/native'

import { BlockyButtonProps } from './BlockyButton'

export const MenuContainer = styled.View`
  gap: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const MainContainer = styled.View`
  width: 100%;
  margin: auto;
  max-width: 375px;
  aspect-ratio: 1 / 2;
  justify-content: center;
  border: 1px solid lightgrey;
`

export const BlockyContainerView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
