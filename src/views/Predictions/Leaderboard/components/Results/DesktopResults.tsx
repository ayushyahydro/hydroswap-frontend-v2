import React from 'react'
import { Card} from 'briws-uikit' // Table, Th
import { PredictionUser } from 'state/types'
import Container from 'components/Layout/Container'
import { useTranslation } from 'contexts/Localization'
import DesktopRow from './DesktopRow'

interface DesktopResultsProps {
  results: PredictionUser[]
}

const DesktopResults: React.FC<DesktopResultsProps> = ({ results }) => {
  const { t } = useTranslation()

  return (
    <Container mb="24px">
      <Card>
        <table> {/*Table*/}
          <thead>
            <tr>
              <th>&nbsp;</th> {/*Th*/}
              <th>{t('User')}</th>
              <th>{t('Net Winnings (BNB)')}</th>
              <th>{t('Win Rate')}</th>
              <th>{t('Rounds Won')}</th>
              <th>{t('Rounds Played')}</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <DesktopRow key={result.id} rank={index + 4} user={result} />
            ))}
          </tbody>
        </table>
      </Card>
    </Container>
  )
}

export default DesktopResults
