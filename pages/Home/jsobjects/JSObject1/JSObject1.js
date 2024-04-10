export default {
	async executeWorkflow(data) {
		const generateQuery = () => {
			return `SELECT count(*), percentile(duration, 90) FROM Transaction WHERE appName = 'appsmith' AND (name LIKE '%NormalizedUri%/git/commit%' OR name LIKE '%NormalizedUri%/git/%merge%' OR name LIKE '%NormalizedUri%/git/%pull%' OR name LIKE '%NormalizedUri%/git/%push%' OR name LIKE '%NormalizedUri%/git/%status%' OR name LIKE '%NormalizedUri%/git/%discard%' OR name LIKE '%NormalizedUri%/git/%create-branch%' OR name LIKE '%NormalizedUri%/git/%checkout-branch%') SINCE 7 days ago FACET name LIMIT 2000`;
		};

		const query = generateQuery();
		const response = await get_data.run({"query": query}).then(response => {
			console.log(`p90`, response);
			return response;
		});

		const message = this.convertToSlackTable(response);
		console.log("message", message);

		await notify_slack.run({"message": message});
		return true;
	},

	convertToSlackTable(responses) {
		
	}
}