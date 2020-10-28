# uniswap-price [![npm version](https://badge.fury.io/js/uniswap-price.svg)](https://badge.fury.io/js/uniswap-price)
get token price from uniswap

## Install 
```
npm i --save uniswap-price
```

## Usage

Note: WETH address is `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`

- **getMidPrice(sourceToken, sourceDecimal, destToken, destDecimal, chainId, infuraKey)**: return the reference price
- **getExecutionPrice(sourceToken, sourceDecimal, destToken, destDecimal, chainId, infuraKey)**: return the exact price for the trade with your specified amount
- **getMidPriceViaETH(sourceToken, sourceDecimal, destToken, destDecimal, chainId, infuraKey)**: return the reference price using route via ETH
- **getExecutionPriceViaETH(sourceToken, sourceDecimal, destToken, destDecimal, chainId, infuraKey)**: return the exact price for the trade with your specified amount using route via ETH
- **getMidPriceViaExactToken(sourceToken, sourceDecimal, destToken, destDecimal, pivotToken, pivotTokenDecimal, chainId, infuraKey)**: return the reference price using route via ExactToken
- **getExecutionPriceViaExactToken(sourceToken, sourceDecimal, destToken, destDecimal, pivotToken, pivotTokenDecimal, chainId, infuraKey)**: return the exact price for the trade with your specified amount using route via ExactToken

### Arguments
- sourceToken: address of source token
- sourceDecimal: decimal of source token
- destToken: address of destination token
- destDecimal: decimal of destination token
- pivotToken: the token used for routing
- pivotTokenDecimal: decimal of the token used for routing
- chainId: default 1 (Ethereum mainnet 1)
- infuraKey: default empty means that we are using defaultProvider with limited request

```nodejs
const uniswapPrice = require('uniswap-price')

 const main = async () => {
     let data
     data = await uniswapPrice.getMidPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18)
     console.log(data)

     data = await uniswapPrice.getExecutionPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "1000000000000000000")
     console.log(data)

data = await uniswapPrice.getMidPriceViaETH("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18)
     console.log(data)

     data = await uniswapPrice.getExecutionPriceViaETH("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "1000000000")
     console.log(data)
     
     let USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
         USDCDecimal = 6
     // getMidPrice via USDC Token
     // route: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48 -> USDC -> 0x6B175474E89094C44Da98b954EedeAC495271d0F
     data = await uniswapPrice.getMidPriceViaExactToken("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, USDC, USDCDecimal)
     console.log(data)
 }
```

