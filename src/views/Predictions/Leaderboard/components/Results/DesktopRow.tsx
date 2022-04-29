import React from 'react'
import { Text } from 'briws-uikit' // td, 
import { PredictionUser } from 'state/types'
import ResultAvatar from './ResultAvatar'
import { NetWinnings } from './styles'

interface DesktopRowProps {
  rank?: number
  user: PredictionUser
}

const DesktopRow: React.FC<DesktopRowProps> = ({ rank, user, ...props }) => (
  <tr {...props}>
    {rank ? (
      <td>
        <Text textAlign="center" fontWeight="bold" color="secondary">{`#${rank}`}</Text>
      </td>
    ) : (
      <td />
    )}
    <td>
      <ResultAvatar user={user} />
    </td>
    <td>
      <NetWinnings
        amount={user.netBNB}
        textPrefix={user.netBNB > 0 ? '+' : ''}
        textColor={user.netBNB > 0 ? 'success' : 'failure'}
      />
    </td>
    <td>
      {`${user.winRate.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}%`}
    </td>
    <td>
      <strong>{user.totalBetsClaimed.toLocaleString()}</strong>
    </td>
    <td>{user.totalBets.toLocaleString()}</td>
  </tr>
)

export default DesktopRow
