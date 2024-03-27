export default {
	socketResponseData: {},
	getData: () => this.socketResponseData,
	WEBSOCKET_ENDPOINT: "wss://stream-internal.wazirx.com/stream",
	socket: undefined,
	lastUpdateTimestamp: 0, // Add this variable to track the last update time
	updateResponseDelay: 5000,
	initializeLastUpdateTimestamp: () => {
		this.lastUpdateTimestamp = 0;
	},
	socketOnOpen: (data) => {
		this.sendEvent("subscribe", ["!ticker@arr"]);
	},
	socketOnMessage: (message) => {
		let response = JSON.parse(message?.data);

		// Check if the specified interval (10 seconds) has passed since the last update
		const currentTime = Date.now();

		if (this.lastUpdateTimestamp === 0) {
			// If this is the first update (lastUpdateTimestamp is 0), initialize socketResponseData
			this.socketResponseData = response?.data;
			Utils.getTickerDataByMarket();

			// Update the last update timestamp to the current time
			this.lastUpdateTimestamp = currentTime;
		}

		if (currentTime - this.lastUpdateTimestamp >= this.updateResponseDelay) {
			// Update the socketResponseData when the interval has passed
			this.socketResponseData = response?.data;
			Utils.getTickerDataByMarket();

			// Update the last update timestamp to the current time
			this.lastUpdateTimestamp = currentTime;
		}

		return response;
	},
	socketOnClose: (data) => {
		console.log('onclose', data);
	},
	onPageLoad: async() => {
		this.socket = new WebSocket(this.WEBSOCKET_ENDPOINT);
		this.socket.onopen = this.socketOnOpen;
		this.socket.onclose = this.socketOnClose;	
		this.socket.onmessage = this.socketOnMessage;
	},
	sendEvent: (eventType, streams) => {
		let tickerObj = {
			event: eventType,
			streams,
			id: Date.now()
		};
		this.socket.send(JSON.stringify(tickerObj));
	}
}
