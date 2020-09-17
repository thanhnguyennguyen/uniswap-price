# uniswap-price [![npm version](https://badge.fury.io/js/uniswap-price.svg)](https://badge.fury.io/js/uniswap-price)
get token price from uniswap

## Install 
```
npm i --save uniswap-price
```

## Usage

Note: WETH address is `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2`

- getMidPrice: return the reference price
- getExecutionPrice: return the exact price for the trade with your specified amount

### Arguments
- sourceToken: address of source token
- sourceDecimal: decimal of source token
- destToken: address of destination token
- destDecimal: decimal of destination token
- chainId: default 1 (Ethereum mainnet 1)
- infuraKey: default empty means that we are using defaultProvider with limited request

```nodejs

 const main = async () => {
     let data
     data = await getMidPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18)
     console.log(data)

     data = await getExecutionPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "1000000000000000000")
     console.log(data)
 }
```

