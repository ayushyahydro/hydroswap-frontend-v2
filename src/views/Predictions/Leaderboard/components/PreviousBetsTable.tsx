import React, { useEffect, useState } from 'react'
import times from 'lodash/times'
import orderBy from 'lodash/orderBy'
import { Skeleton} from 'briws-uikit' // Table, td, th 
import { useTranslation } from 'contexts/Localization'
import { transformBetResponse } from 'state/predictions/helpers' // getBethistory,
import { Bet } from 'state/types'
import PositionLabel from './PositionLabel'
import { NetWinnings } from './Results/styles'

interface PreviousBetsTableProps {
  numberOfBets?: number
  account: string
}

const PreviousBetsTable: React.FC<PreviousBetsTableProps> = ({ numberOfBets = 5, account }) => {
  const [isFetching, setIsFetching] = useState(false)
  const [bets, setBets] = useState<Bet[]>([])
  const { t } = useTranslation()
  const orderedBets = orderBy(bets, ['round.epoch'], ['desc'])

  useEffect(() => {
    /*const fetchBethistory = async () => {
      setIsFetching(true)
      try {
        const response = await getBethistory(
          {
            user: account.toLowerCase(),
          },
          numberOfBets,
        )

        setBets(response.map(transformBetResponse))
      } finally {
        setIsFetching(false)
      }
    }*/

    // fetchBethistory()
  }, [account, numberOfBets, setIsFetching, setBets])

  return (
    <table>
      <thead>
        <tr>
          <th>{t('Round')}</th>
          <th>{t('Direction')}</th>
          <th>{t('Winnings (BNB)')}</th>
        </tr>
      </thead>
      <tbody>
        {isFetching
          ? times(numberOfBets).map((num) => (
              <tr key={num}>
                <td>
                  <Skeleton width="80px" />
                </td>
                <td>
                  <Skeleton width="60px" height="32px" />
                </td>
                <td>
                  <Skeleton width="80px" />
                </td>
              </tr>
            ))
          : orderedBets.map((bet) => {
              const isWinner = bet.position === bet.round.position

              return (
                <tr key={bet.id}>
                  <td>
                    {bet.round.epoch.toLocaleString()}
                  </td>
                  <td>
                    <PositionLabel position={bet.position} />
                  </td>
                  <td>
                    <NetWinnings
                      amount={isWinner ? bet.claimedNetBNB : bet.amount}
                      textPrefix={isWinner ? '+' : '-'}
                      textColor={isWinner ? 'success' : 'failure'}
                    />
                  </td>
                </tr>
              )
            })}
      </tbody>
    </table>
  )
}

export default PreviousBetsTable
