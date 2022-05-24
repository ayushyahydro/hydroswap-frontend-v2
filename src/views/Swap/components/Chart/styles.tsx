import { Box } from 'hydroswap-uikitv2'
import styled from 'styled-components'

export const StyledPriceChart = styled(Box)<{ $isDark: boolean; $isExpanded: boolean }>`
  border: none;
  border-radius: 32px;
  width: 100%;
  padding-top: 36px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 8px;
    background: ${({ $isDark }) => ($isDark ? 'rgba(39, 38, 44, 0.5)' : 'rgba(255, 255, 255, 0.5)')};
    border: ${({ theme }) => `1px solid ${theme.colors.cardBorder}`};
    border-radius: ${({ $isExpanded }) => ($isExpanded ? '0' : '16px')};
    width: ${({ $isExpanded }) => ($isExpanded ? 'calc(100% - 3rem)' : '50%')};
    height: ${({ $isExpanded }) => ($isExpanded ? 'calc(100vh - 160px)' : '484px')};
    margin: ${({ $isExpanded }) => ($isExpanded ? '1rem 0  0 2rem' : 'auto')};
  }
`

StyledPriceChart.defaultProps = {
  height: '70%',
}
