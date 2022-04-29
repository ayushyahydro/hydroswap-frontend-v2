// import { MenuItemsType, DropdownMenuItemType } from 'briws-uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = { hideSubNav?: boolean } // MenuItemsType

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade 📈'),
    icon: 'Swap',
    href: '/swap',
    showItemsOnMobile: false,
    items: [
      {
        label: t('Exchange'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('My Portfolio 💼'),
    href: '/soon',
    icon: 'Earn',
    items: [
      {
        label: t('My Tokens'),
        href: '/soon',
      },
      {
        label: t('My NFTs'),
        href: '/soon',
      },
    ],
  },
  {
    label: t('NFTs 🎨'),
    href: `${nftsBaseUrl}`,
    icon: 'Nft',
    items: [
      {
        label: t('Overview'),
        href: '/soon',
      },
      {
        label: t('Collections'),
        href: '/soon',
      },
      {
        label: t('Activity'),
        href: '/soon',
      },
    ],
  },
  {
    label: 'Info',
    href: '/info',
    icon: 'More',
    hideSubNav: true,
    items: [
      {
        label: t('Stats'),
        href: '/info',
      },
      /* {
        type: DropdownMenuItemType.DIVIDER,
      }, */
      {
        label: t('Project Hydro'),
        href: 'https://projecthydro.org',
        type: '', // DropdownMenuItemType.EXTERNAL_LINK
      },
      {
        label: t('Docs'),
        href: 'https://docs.pancakeswap.finance',
        type: '', //
      },
    ],
  },
]

export default config
