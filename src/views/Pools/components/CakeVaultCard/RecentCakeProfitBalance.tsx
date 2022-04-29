import React from 'react'
import { Text } from 'briws-uikit' // TooltipText, useTooltip
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'

interface RecentCakeProfitBalanceProps {
  cakeToDisplay: number
  dollarValueToDisplay: number
  dateStringToDisplay: string
}

const RecentCakeProfitBalance: React.FC<RecentCakeProfitBalanceProps> = ({
  cakeToDisplay,
  dollarValueToDisplay,
  dateStringToDisplay,
}) => {
  const { t } = useTranslation()

/*  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Balance fontSize="16px" value={cakeToDisplay} decimals={3} bold unit=" CAKE" />
      <Balance fontSize="16px" value={dollarValueToDisplay} decimals={2} bold prefix="~$" />
      {t('Earned since your last action')}
      <Text>{dateStringToDisplay}</Text>
    </>,
    {
      placement: 'bottom-end',
    },
  )*/

  return (
    <>
      <div>tooltipVisible && tooltip</div>
{/*      <TooltipText ref={targetRef} small>

      </TooltipText> */}
      <div>
          <Balance fontSize="14px" value={cakeToDisplay} />
      </div>
    </>
  )
}

export default RecentCakeProfitBalance
