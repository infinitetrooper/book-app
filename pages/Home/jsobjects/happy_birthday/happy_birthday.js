export default {  

	// Orchestrate your workflow below
	executeWorkflow : (data) => {    
		const filteredEmployees = [];

		for (let employee of Table1.tableData) {
			if (matchesBirthDateCriteria(employee.birthDate)) {
				filteredEmployees.push(employee);
			}
		}

		return filteredEmployees;

	}
}
