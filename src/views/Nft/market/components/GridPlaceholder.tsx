import React from 'react'
import { Box, BoxProps, Skeleton } from 'briws-uikit' // Grid, GridProps,
import times from 'lodash/times'

/* interface GridPlaceholderProps extends GridProps {
  numItems?: number
} */

export const GridPlaceholderItem: React.FC<BoxProps> = (props) => (
  <Box {...props}>
    <Skeleton height="258px" mb="8px" />
    <Skeleton width="30%" mb="4px" />
    <Skeleton width="45%" mb="16px" />
    <Skeleton />
  </Box>
)

// GridPlaceholderProps { numItems = 12, ...props }
const GridPlaceholder: React.FC = () => (
  /* <Grid gridGap="16px" gridTemplateColumns={['1fr', null, null, 'repeat(4, 1fr)']} {...props}>
    {times(numItems).map((itemKey) => (
      <GridPlaceholderItem key={itemKey} />
    ))}
  </Grid> */
  <div>Grid</div>
)

export default GridPlaceholder
