import React, { ReactNode } from 'react'
import { Box, Heading } from 'briws-uikit' // Grid, GridProps,

// extends GridProps
interface MarketPageTitleProps {
  title: string
  description?: ReactNode
  children: ReactNode
}

const MarketPageTitle: React.FC<MarketPageTitleProps> = ({ title, description, children, ...props }) => (
  /* <Grid gridGap="16px" alignItems="center" gridTemplateColumns={['1fr', null, null, null, 'repeat(2, 1fr)']} {...props}> */
  <div>
    <Box>
      {/* @ts-ignore */}
      <Heading as="h1" scale="xl" color="secondary" mb="16px">
        {title}
      </Heading>
      {description}
    </Box>
    <Box>{children}</Box>
  </div>
)

export default MarketPageTitle
