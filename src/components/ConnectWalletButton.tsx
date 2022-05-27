import React from 'react'
import { Button, useWalletModal } from 'hydroswap-uikitv2'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'

const StyledBtn = styled(Button)`
  background-color: #2e2e30cf !important;
`

const ConnectWalletButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  return (
    <StyledBtn onClick={onPresentConnectModal} {...props}>
      {t('Connect Wallet')}
    </StyledBtn>
  )
}

export default ConnectWalletButton
