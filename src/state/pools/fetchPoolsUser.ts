
/* eslint-disable no-console */
import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getMasterchefContract, getBep20Contract, getKvsStakingContract} from 'utils/contractHelpers'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useERC20 } from 'hooks/useContract'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((pool) => pool.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((pool) => pool.sousId !== 0)
// const masterChefContract = getMasterchefContract()
const kvsStakingContract = getKvsStakingContract()


export const fetchPoolsAllowance = async (account) => {

  // const calls = nonBnbPools.map((pool) => ({
  //   address: pool.stakingToken.address,
  //   name: 'allowance',
  //   params: [account, getAddress(pool.contractAddress)],
  // }))



const allowances = nonBnbPools.map(async (pool) => {
  let allowance
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const token = getBep20Contract(pool.stakingToken.address, provider)
  console.log(token, "token")
  try {
    allowance  = await token.allowance(account, getAddress(pool.contractAddress))
    console.log( allowance.toString(), "allowance")
   
  }  catch(error){
    console.log(error, 'allowance error')
  }
  return allowance
})


 
  return nonBnbPools.reduce(
    async (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(await allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  // const calls = nonBnbPools.map((pool) => ({
  //   address: pool.stakingToken.address,
  //   name: 'balanceOf',
  //   params: [account],
  // }))
  // const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalancesRaw = nonBnbPools.map(async (pool) => {
    let balance
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const token = getBep20Contract(pool.stakingToken.address, provider)
    try {
      balance  = await token.balanceOf(account)
      console.log( balance.toString(), "balance")
    }  catch(error){
      console.log(error, 'balance error')
    }
    return balance
  })
  const tokenBalances = nonBnbPools.reduce(
    async (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(await tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await simpleRpcProvider.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance.toString()).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await kvsStakingContract.viewUser(account)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )
  

  // // Cake / Cake pool
   const {amount: masterPoolAmount } = await kvsStakingContract.viewUser(account)

   return { ...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
 
  // const calls = nonMasterPools.map((p) => ({
  //   address: getAddress(p.contractAddress),
  //   name: 'pendingReward',
  //   params: [account],
  // }))
  // const res = await multicall(sousChefABI, calls)

  const res = nonBnbPools.map(async (pool) => {
    let balance
    
    try {
      balance  =  kvsStakingContract.checkCurrentRewards(account)
      console.log( balance.toString(), "balance")
    }  catch(error){
      console.log(error, 'balance error')
    }
    return balance
  })
  const pendingRewards = nonMasterPools.reduce(
    async (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(await res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward = await kvsStakingContract.checkCurrentRewards(account)
  console.log(kvsStakingContract, 'kvs')
  console.log(pendingReward, "pending")


  return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON() }
}
