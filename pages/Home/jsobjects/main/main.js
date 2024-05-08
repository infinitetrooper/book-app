export default {
	async executeWorkflow() {
		// Orchestrate your workflow below
	 let a = 2;
		this.add(a);
		console.log(a);

	},

	add(a) {
		a += 1;
		console.log(a);
	}
}