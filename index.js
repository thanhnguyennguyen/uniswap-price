 const {
     ChainId,
     Token,
     WETH,
     Fetcher,
     Route,
     Trade,
     TokenAmount,
     TradeType
 } = require('@uniswap/sdk')
 const {
     getNetwork
 } = require('@ethersproject/networks')

 const {
     getDefaultProvider,
     InfuraProvider
 } = require('@ethersproject/providers')

 const getMidPrice = async (baseToken, baseDecimal, quoteToken, quoteDecimal, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         pair = await Fetcher.fetchPairData(quote, base, network),
         route = await new Route([pair], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }

 const getExecutionPrice = async (baseToken, baseDecimal, quoteToken, quoteDecimal, tradeAmount, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }
     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         pair = await Fetcher.fetchPairData(quote, base, network),
         route = await new Route([pair], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }
 const getMidPriceViaETH = async (baseToken, baseDecimal, quoteToken, quoteDecimal, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId], network),
         WETHbase = await Fetcher.fetchPairData(WETH[chainId], base, network),
         route = await new Route([WETHbase, quoteWETH], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }
 const getExecutionPriceViaETH = async (baseToken, baseDecimal, quoteToken, quoteDecimal, tradeAmount, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }
     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
     quoteWETH = await Fetcher.fetchPairData(quote, WETH[chainId], network),
         WETHbase = await Fetcher.fetchPairData(WETH[chainId], base, network),
         route = await new Route([WETHbase, quoteWETH], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }

 const getMidPriceViaExactToken = async (baseToken, baseDecimal, quoteToken, quoteDecimal, midToken, midDecimal, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }

     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
         mid = new Token(chainId, midToken, midDecimal)
         quoteMid = await Fetcher.fetchPairData(quote, mid, network),
         midBase = await Fetcher.fetchPairData(mid, base, network),
         route = await new Route([midBase, quoteMid], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6)

     return {
         base2quote: base2quote,
         quote2base: quote2base
     }

 }
 const getExecutionPriceViaExactToken = async (baseToken, baseDecimal, quoteToken, quoteDecimal, midToken, midDecimal, tradeAmount, chainId, infuraKey) => {
     if (chainId == undefined) {
         chainId = ChainId.MAINNET
     }
     let network
     if (infuraKey != undefined) {
         network = new InfuraProvider(getNetwork(chainId), infuraKey)
     } else {
         network = getDefaultProvider(getNetwork(chainId))
     }
     let base = new Token(chainId, baseToken, baseDecimal),
         quote = new Token(chainId, quoteToken, quoteDecimal),
 	 mid = new Token(chainId, midToken, midDecimal)
         quoteMid = await Fetcher.fetchPairData(quote, mid, network),
         midBase = await Fetcher.fetchPairData(mid, base, network),
         route = await new Route([midBase, quoteMid], base),
         base2quote = await route.midPrice.toSignificant(6),
         quote2base = await route.midPrice.invert().toSignificant(6),
         trade = new Trade(route, new TokenAmount(base, tradeAmount), TradeType.EXACT_INPUT)

     return trade.executionPrice.toSignificant(6)

 }


 const main = async () => {
     let data
     data = await getMidPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18)
     console.log(data)

     data = await getExecutionPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "1000000000000000000")
     console.log(data)
     data = await getMidPriceViaETH("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18)
     console.log(data)

     data = await getExecutionPriceViaETH("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "1000000000")
     console.log(data)
 }
 //main()
 module.exports = {
     getMidPrice: getMidPrice,
     getExecutionPrice: getExecutionPrice,
     getMidPriceViaETH: getMidPriceViaETH,
     getExecutionPriceViaETH: getExecutionPriceViaETH,
     getMidPriceViaExactToken: getMidPriceViaExactToken,
     getExecutionPriceViaExactToken: getExecutionPriceViaExactToken,
 }
