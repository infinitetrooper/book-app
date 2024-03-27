export default {
	/* Variable that contains boolean value as to whether Ticker data has started/stopped */
	tickerStatus: true,
	/*
		Function to unsubscribe from Ticker Data if its already running, or to subscribe to start receiving Ticker Data.
		Also updates the tickerStatus value.
	*/
	toggleTickerData: () => {
		if (!!this.tickerStatus) {
			WebsocketUtils.sendEvent("unsubscribe", ["!ticker@arr"]);
			WebsocketUtils.socketResponseData = {};
		}
		else WebsocketUtils.sendEvent("subscribe", ["!ticker@arr"]);
		this.tickerStatus = !this.tickerStatus
	},
	/* Function to return whether the crypto currency price has increased or decreased */
	getHighLow: (item) => item.last - item.open < 0 ? "low" : "high",
	/* Function to return Ticker Data filtered based on Market or All markets */
	getTickerDataByMarket: () => {
		let market = sel_market.selectedOptionValue || "all";
		console.log('SocketResData', WebsocketUtils.socketResponseData);
		const tickerDataArray = _.toArray(WebsocketUtils.socketResponseData)
		.filter((item) => market === "all" || item.quote_unit === market);

		// Add the _id field to each object in the array
		const updatedTickerDataArray = tickerDataArray.map((item, index) => {
			return { ...item, _id: index };
		});

		return updatedTickerDataArray;
	},
	get24hChange: (lastPrice, openPrice) => {
		// Convert the price values from strings to numbers
		const lastPriceNo = parseFloat(lastPrice);
		const openPriceNo = parseFloat(openPrice);

		// Calculate the percentage change
		const percentageChange = ((lastPriceNo - openPriceNo) / openPriceNo) * 100;

		return percentageChange.toFixed(2);
	},
}