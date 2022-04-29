import React from 'react'
/*import {
  TokenPairImage as UIKitTokenPairImage,
  TokenPairImageProps as UIKitTokenPairImageProps,
  TokenImage as UIKitTokenImage,
  ImageProps,
} from 'briws-uikit'*/
import tokens from 'config/constants/tokens'
import { Token } from '@pancakeswap/sdk'

interface TokenPairImageProps { /* extends Omit<UIKitTokenPairImageProps, 'primarySrc' | 'secondarySrc'> */
  primaryToken: Token
  secondaryToken: Token
}

const getImageUrlFromToken = (token: Token) => {
  const address = token.symbol === 'BNB' ? tokens.wbnb.address : token.address
  return `/images/tokens/${address}.svg`
}

export const TokenPairImage: React.FC<TokenPairImageProps> = ({ primaryToken, secondaryToken, ...props }) => {
  return (
      <div>TokenPairImage</div>
    /*<UIKitTokenPairImage
      primarySrc={getImageUrlFromToken(primaryToken)}
      secondarySrc={getImageUrlFromToken(secondaryToken)}
      {...props}
    />*/
  )
}

interface TokenImageProps { /* extends ImageProps */
  token: Token
}

export const TokenImage: React.FC<TokenImageProps> = ({ token, ...props }) => {
  return <div>UIKitTokenImage</div> /*<UIKitTokenImage src={getImageUrlFromToken(token)} {...props} />*/

}
