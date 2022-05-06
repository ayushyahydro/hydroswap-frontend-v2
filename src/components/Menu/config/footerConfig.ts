import { FooterLinkType } from 'hydroswap-uikit'
import { ContextApi } from 'contexts/Localization/types'

export const footerLinks: (t: ContextApi['t']) => FooterLinkType[] = (t) => [
  {
    label: t('Partners'),
    items: [
      {
        label: t('Hydrogen'),
        href: 'https://www.hydrogenplatform.com',
      },
      {
        label: t('Bloceducare'),
        href: 'https://www.blocedu.care/',
      },
      {
        label: t('Vulkania'),
        href: 'https://vulkania.io/coins/hydro',
      },
      {
        label: t('SparkPoint'),
        href: 'https://sparkpoint.io/',
      },
      {
        label: t('TUSC'),
        href: 'https://tusc.network/',
      },
      {
        label: t('OpenDeFi'),
        href: 'https://opendefi.finance/',
      },
    ],
  },
  {
    label: t('Products'),
    items: [
      {
        label: t('Aegir on Android'),
        href: 'https://play.google.com/store/apps/details?id=com.aegirwallet&amp;hl=en_US&amp;gl=US',
      },
      {
        label: t('Aegir on IOS'),
        href: 'https://apps.apple.com/se/app/aegir-wallet/id1598353170?l=en',
      },
      {
        label: t('Keresverse'),
        href: 'https://keresverse.org',
      },
      {
        label: t('Hydro Bridge'),
        href: 'https://hydro-bridge.org',
      },
      {
        label: t('HydroSwap'),
        href: 'https://hydroswap.org',
      },
    ],
  },
  {
    label: t('Resources'),
    items: [
      {
        label: 'Github',
        href: 'https://github.com/HydroBlockchain',
      },
      {
        label: t('Whitepaper'),
        href: 'https://github.com/HydroBlockchain/whitepapers',
      },
    ],
  },
]
