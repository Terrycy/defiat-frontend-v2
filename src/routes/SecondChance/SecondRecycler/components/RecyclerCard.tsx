import React, { useCallback, useEffect, useState } from 'react'
import { Card } from '../../../../components/Card'
import { Flex } from '../../../../components/Flex'
import secondBrand from '../../../../assets/img/secondBrand1320.png'
import { Button, Collapse, Grid, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { AddCircleOutlineRounded, ArrowDropDownRounded, CloseRounded, ForwardRounded, LaunchRounded, SwapVertRounded } from '@material-ui/icons'
import second256 from '../../../../assets/img/second256.png'
import rug256 from '../../../../assets/img/rug256.png'
import { useModal } from '../../../../hooks/useModal'
import { RuggedTokenModal } from './RuggedTokenModal'
import Links from '../../../../constants/links'
import { useSecond } from '../../../../hooks/useSecond'
import Rugs, { RugToken } from '../../../../constants/rugs'
import { useWallet } from 'use-wallet'
import { getBalance, getFullDisplayBalance, getTotalSupply } from '../../../../utils'
import { provider } from 'web3-core'
import { BigNumber } from '../../../../defiat'
import { RecyclerExpandedField } from './RecyclerExpandedField'

const useStyles = makeStyles((theme) => ({
  arrow: {
    transform: 'rotate(90deg)',
  },
  icon: {
    color: theme.palette.primary.dark,
    fontSize: '2rem',
  },
  image: {
    height: 'auto',
    [theme.breakpoints.up('lg')]: {
      width: '512px'
    },
    [theme.breakpoints.down('md')]: {
      width: '192px'
    }
  }
}))

interface RecyclerData {
  ruggedBalance:BigNumber;
  ruggedSupply:BigNumber;
  swapRate:BigNumber;
}

export const RecyclerCard = () => {
  const classes = useStyles()
  const {
    account,
    chainId,
    ethereum
  }: {account:string, chainId:number, ethereum:provider} = useWallet()
  const {data, fetchSwapRate} = useSecond()
  const [onPresent] = useModal(<RuggedTokenModal onSelect={(id) => setSelected(Rugs.Tokens[chainId][id])} />)

  const [open, setOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<RugToken>()
  const [recyclerData, setRecyclerData] = useState<RecyclerData>()

  const getMultiplier = useCallback((balance:BigNumber) => {
    if (balance.lte(new BigNumber(100).multipliedBy(1e18))) {
      return '100'
    } else if (balance.gte(new BigNumber(300).multipliedBy(1e18))) {
      return '300'
    } else {
      return balance.dividedBy(1e18).toFixed(0)
    }
  }, [])

  const fetchSwapData = useCallback(async () => {
    const values = await Promise.all([
      getBalance(selected.address, account, ethereum),
      getTotalSupply(selected.address, ethereum)
    ])

    const swapRate = await fetchSwapRate(selected.address, values[0].toString())

    setRecyclerData({
      ruggedBalance: values[0],
      ruggedSupply: values[1],
      swapRate
    })
  }, [account, ethereum, selected, fetchSwapRate])

  useEffect(() => {
    if (!!selected) {
      fetchSwapData()
    }
  }, [selected, fetchSwapData])

  return (
    <Card>
      <Flex column>
        <Flex center mb={1}>
          <img src={secondBrand} className={classes.image} alt="second-chance" />
        </Flex>
        <TextField 
          value={recyclerData ? getFullDisplayBalance(recyclerData.ruggedBalance) : undefined}
          type="number"
          label="Deposit Rugs"
          placeholder="Select a Rugged Token to Swap"
          variant="outlined"
          fullWidth
          disabled
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={rug256} height="48px" width="auto" alt="second-logo" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Button endIcon={<ArrowDropDownRounded />} onClick={onPresent}>
                  {!selected ? "Select" : selected.symbol}
                </Button>
              </InputAdornment>
            ),
          }} 
        />
        <Collapse in={open}>
          <RecyclerExpandedField 
            label="Swap Fee (ETH)"
            data={data ? getFullDisplayBalance(data.ethFee) : ''}
            topIcon={<SwapVertRounded className={classes.icon} />}
          />
          <RecyclerExpandedField 
            label="Rugged Total Supply"
            data={recyclerData ? getFullDisplayBalance(recyclerData.ruggedSupply, selected.decimals) : ''}
            topIcon={<AddCircleOutlineRounded className={classes.icon} />}
          />
          <RecyclerExpandedField 
            label="% Total Supply Owned"
            data={recyclerData ? getFullDisplayBalance(recyclerData.ruggedBalance.dividedBy(recyclerData.ruggedSupply).multipliedBy(100), 0) : ''}
            topIcon={<CloseRounded className={classes.icon} />}
          />
          <RecyclerExpandedField 
            label="% DeFiat Multiplier"
            data={data ? getMultiplier(data.tokenBalance) : ''}
            topIcon={<CloseRounded className={classes.icon} />}
          />
        </Collapse>
        <Flex my={1}>
          <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Flex center>
                <ForwardRounded className={`${classes.arrow} ${classes.icon}`} />
              </Flex>
            </Grid>
            <Grid item xs={4}>
              <Flex justify='flex-end'>
                {!open ? (
                  <Button onClick={() => setOpen(!open)}>See More</Button>
                ) : (
                  <Button onClick={() => setOpen(!open)}>See Less</Button>
                )}
              </Flex>
            </Grid>
          </Grid>
        </Flex>
        <TextField
          fullWidth
          value={recyclerData ? getFullDisplayBalance(recyclerData.swapRate) : undefined}
          // onChange={(e) => setDepositInput(e.target.value)}
          type="number"
          label="Receive 2ND"
          placeholder="Convert your tokens to 2ND"
          variant="outlined"
          disabled={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={second256} height="48px" width="auto" alt="second-logo" />
              </InputAdornment>
            ),
          }}
        />
        <Flex mt={2} mb={1}>
          {true ? (
            <Button 
              fullWidth
              disabled={!recyclerData || !recyclerData.swapRate || recyclerData.swapRate.eq(0)}
              onClick={() => {}}
              variant="contained"
              color="primary"
            >
              Approve
            </Button>
          ) : (
            <Button 
              fullWidth
              onClick={() => {}}
              variant="contained"
              color="primary">
              Swap for 2ND
            </Button>
          )}
        </Flex>
        <Button 
          fullWidth 
          variant="contained" 
          endIcon={<LaunchRounded />}
          href={Links.uniswapSecond}
        >
          Trade 2ND
        </Button>
      </Flex>
    </Card>
  )
}