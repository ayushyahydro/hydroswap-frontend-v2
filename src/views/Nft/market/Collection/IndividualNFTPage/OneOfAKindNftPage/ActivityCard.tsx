import React, { useEffect, useState } from 'react'
import { Flex, Card, Text, useMatchBreakpoints, ArrowBackIcon, ArrowForwardIcon } from 'briws-uikit' // Table, th, 
import { useTranslation } from 'contexts/Localization'
// import usetheme from 'hooks/usetheme' // to much errors inside
import { Activity, NftToken } from 'state/nftMarket/types'
import { useBNBBusdPrice } from 'hooks/useBUSDPrice'
import { useAppDispatch } from '../../../../../../state'
import NoNftsImage from '../../../components/Activity/NoNftsImage'
import TableLoader from '../../../../../../components/TableLoader'
import { Arrow, PageButtons } from '../../../components/PaginationButtons'
import { getTokenActivity } from '../../../../../../state/nftMarket/helpers'
import { sortActivity } from '../../../ActivityHistory/utils/sortActivity'
import ActivityRow from '../../../components/Activity/ActivityRow'

interface ActivityCardProps {
  nft: NftToken
}

const MAX_PER_PAGE = 5

const ActivityCard: React.FC<ActivityCardProps> = ({ nft }) => {
  const dispatch = useAppDispatch()
  // const { theme } = usetheme()
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPages] = useState(1)
  const [activitiesSlice, setActivitiesSlice] = useState<Activity[]>([])
  const [sortedTokenActivities, setSortedTokenActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const bnbBusdPrice = useBNBBusdPrice()
  const { isXs, isSm } = useMatchBreakpoints()

  useEffect(() => {
    const fetchTokenActivity = async () => {
      try {
        const tokenActivity = await getTokenActivity(nft.tokenId, nft.collectionAddress.toLowerCase())
        setSortedTokenActivities(sortActivity(tokenActivity))
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch address activity', error)
      }
    }

    fetchTokenActivity()
  }, [nft, dispatch])

  useEffect(() => {
    const getMaxPages = () => {
      const max = Math.ceil(sortedTokenActivities.length / MAX_PER_PAGE)
      setMaxPages(max)
    }

    if (sortedTokenActivities.length > 0) {
      getMaxPages()
    }

    return () => {
      setActivitiesSlice([])
      setMaxPages(1)
      setCurrentPage(1)
    }
  }, [sortedTokenActivities])

  useEffect(() => {
    const getActivitySlice = () => {
      const slice = sortedTokenActivities.slice(MAX_PER_PAGE * (currentPage - 1), MAX_PER_PAGE * currentPage)
      setActivitiesSlice(slice)
    }
    if (sortedTokenActivities.length > 0) {
      getActivitySlice()
    }
  }, [sortedTokenActivities, currentPage])

  return (
    <Card>
      {sortedTokenActivities.length === 0 && activitiesSlice.length === 0 && !isLoading ? (
        <Flex p="24px" flexDirection="column" alignItems="center">
          <NoNftsImage />
          <Text pt="8px" bold>
            {t('No NFT market history found')}
          </Text>
        </Flex>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th> {t('Event')}</th>
                {isXs || isSm ? null : (
                  <>
                    <th> {t('Price')}</th>
                    <th> {t('From')}</th>
                    <th> {t('To')}</th>
                  </>
                )}
                <th> {t('Date')}</th>
                {isXs || isSm ? null : <th />}
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <TableLoader />
              ) : (
                activitiesSlice.map((activity) => {
                  return (
                    <ActivityRow
                      key={`${activity.nft.tokenId}${activity.timestamp}`}
                      activity={activity}
                      nft={nft}
                      bnbBusdPrice={bnbBusdPrice}
                      isNftActivity
                    />
                  )
                })
              )}
            </tbody>
          </table>
          <Flex
            borderTop={`1px red solid`}
            // borderTop={`1px ${theme.colors.cardBorder} solid`}
            pt="24px"
            flexDirection="column"
            justifyContent="space-between"
            height="100%"
          >
            <PageButtons>
              <Arrow
                onClick={() => {
                  setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)
                }}
              >
                <ArrowBackIcon color={currentPage === 1 ? 'textDisabled' : 'primary'} />
              </Arrow>
              <Text>{t('Page %page% of %maxPage%', { page: currentPage, maxPage })}</Text>
              <Arrow
                onClick={() => {
                  setCurrentPage(currentPage === maxPage ? currentPage : currentPage + 1)
                }}
              >
                <ArrowForwardIcon color={currentPage === maxPage ? 'textDisabled' : 'primary'} />
              </Arrow>
            </PageButtons>
          </Flex>
        </>
      )}
    </Card>
  )
}

export default ActivityCard
