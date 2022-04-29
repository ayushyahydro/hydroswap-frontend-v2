import React from 'react'
import { Button, useModal } from 'briws-uikit' // HistoryIcon,
import TransactionsModal from './TransactionsModal'

const Transactions = () => {
  const [onPresentTransactionsModal] = useModal(<TransactionsModal />)
  return (
    <>
      <Button variant="text" p={0} onClick={onPresentTransactionsModal} ml="16px">
        {/* <HistoryIcon color="textSubtle" width="24px" /> */}
         <div>HistoryIcon</div>
      </Button>
    </>
  )
}

export default Transactions
