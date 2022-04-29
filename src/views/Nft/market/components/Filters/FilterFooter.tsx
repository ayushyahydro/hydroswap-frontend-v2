import React, {ReactNode} from 'react'
// import { Grid, GridProps } from 'briws-uikit'

// GridProps
const FilterFooter: React.FC<PropsType> = ({ children, ...props }) => (
  /*<Grid
    gridGap="16px"
    gridTemplateColumns="repeat(2,1fr)"
    {...props}
    px="24px"
    py="16px"
    borderTop="1px solid"
    borderTopColor="cardBorder"
  >*/
  <div>
    {children}
  </div>
)

export default FilterFooter

type PropsType = {
  children: ReactNode
}