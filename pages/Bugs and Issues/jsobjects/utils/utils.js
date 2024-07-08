export default {

	// openSetup: async () => {
	// if (appsmith.mode == "EDIT") {
	// showModal('mod_setup')
	// }
	// },

	// getAirTableData: () => {
	// if (appsmith?.store?.baseId?.length == 0 && appsmith?.store?.tableName?.length == 0) {
	// return getBase1.data.records.map(record => {
	// let row = record.fields;
	// row['id'] = record.id;
	// return row;
	// })
	// } else {
	// utils.storeInfo()
	// return getBase.data.records.map(record => {
	// let row = record.fields;
	// row['id'] = record.id;
	// return row;
	// })
	// }
	// },

	// viewAttachment: () => {
	// showModal(
	// List1.selectedItem.type == 'application/pdf' ? 'mdl_PDF' :
	// List1.selectedItem.type.match('image') ? 'mdl_Image' :
	// List1.selectedItem.type.match('video') ? 'mdl_Video' :
	// '')
	// },
	// 
	// filetypeIcon: (type = List1.selectedItem.type) => {
	// return type.match('pdf') ? 'document' :
	// type.match('image') ? 'camera' :
	// type.match('video') ? 'video' :
	// 'play'
	// 
	// },
	// 
	// associatedFeatures: () => {
	// const features = List2.selectedItem.Associated_features
	// return (features.toString())
	// },
	// 
	// bugTitle: () => {
	// const features = List2.selectedItem.Name
	// return (features.toString())
	// },
	// 
	// assignedTo: () => {
	// const assign = List2.selectedItem.Assigned_to
	// return (assign.toString())
	// },

	// highPriority: () => {
	// if (appsmith?.store?.baseId.length == 0 && appsmith?.store?.tableName.length == 0) {
	// const high = getBase1.data.records.map(record => record.fields.Priority)
	// return high.filter((currentItem) => currentItem == 'High').length;
	// } else {
	// const high = getBase.data.records.map(record => record.fields.Priority)
	// return high.filter((currentItem) => currentItem == 'High').length;
	// }
	// },
	// 
	imageIndex: 0,
	nextImage: () => {
		const allAttachmentsLength = lst_issues.triggeredItem.Attachments.length;

		if (this.imageIndex === allAttachmentsLength - 1) return
		return this.imageIndex = this.imageIndex + 1
	},
	prevImage: () => {
		if (this.imageIndex === 0) return
		return this.imageIndex = this.imageIndex - 1
	},
	resetImageIndex: () => {
		this.imageIndex = 0;
	},
	criticalBugs: () => {
		let dataSource;
		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			dataSource = demoData.data.records;
		} else {
			const baseData = getBase.data;
			dataSource = baseData.records;
		};
		return dataSource.filter(d => d.fields.Priority === 'Critical').length;
	},
	highPriority: () => {
		let dataSource;
		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			dataSource = demoData.data.records;
		} else {
			const baseData = getBase.data;
			dataSource = baseData.records;
		};
		return dataSource.filter(d => d.fields.Priority === 'High').length;
	},
	overdueBugs: () => {
		let dataSource;
		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			dataSource = demoData.data.records;
		} else {
			const baseData = getBase.data;
			dataSource = baseData.records;
		};

		// Calculate the date 30 days ago
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		return dataSource.filter(d =>
														 d.fields.Status === 'In progress' &&											 
														 new Date(d.fields.Opened_date) < thirtyDaysAgo
														).length;
	},


	closedBugs: () => {
		let dataSource;
		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			dataSource = demoData.data.records;
		} else {
			const baseData = getBase.data;
			dataSource = baseData.records;
		};
		return dataSource.filter(d => d.fields.Status === 'Complete').length;
	},

	filteredData: async () => {
		let dataSource;
		const status = sel_status.selectedOptionValue;
		const priority = sel_priority.selectedOptionValue;

		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			dataSource = demoData.data.records;
		} else {
			const baseData = await getBase.run();
			dataSource = baseData.records;
		};
		return dataSource.filter(d => {
			if (status && priority) {
				return d.fields.Status === status && d.fields.Priority === priority;
			} else if (status) {
				return d.fields.Status === status;
			} else if (priority) {
				return d.fields.Priority === priority;
			} else {
				return true;
			}
		}).map(record => {
			let row = record.fields;
			row['id'] = record.id;
			return row;
		});
	},

	getStatuses: () => {
		let dataSource;

		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			dataSource = demoData.data.records;
		} else {
			const baseData = getBase.data
			dataSource = baseData.records;
		}
		return [...new Set(dataSource.map(item => item.fields.Status))].map((s => {
			return {
				label: s,
				value: s,
			}
		}))
	},

	getAssignees: () => {
		let dataSource;

		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			dataSource = demoData.data.records;
		} else {
			const baseData = getBase.data;
			dataSource = baseData.records;
		}
		return [...new Set(dataSource.map(item => item.fields.Assigned_to))].map((s => {
			return {
				label: s,
				value: s,
			}
		}))
	},

	getPriorities: () => {
		let dataSource;

		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			dataSource = demoData.data.records;
		} else {
			const baseData = getBase.data
			dataSource = baseData.records;
		}
		return [...new Set(dataSource.map(item => item.fields.Priority))].map((s => {
			return {
				label: s,
				value: s,
			}
		}))
	},

	updateIssue: async () => {
		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			const updateObject = demoData.data.records.filter(r => r.id === lst_issues.triggeredItem.id)[0];
			console.log('UU', updateObject);
			demoData.setData(
				[
					{
						...updateObject,
						fields: {
							...updateObject.fields,
							Status: sel_issueStatus.selectedOptionValue,
							Priority: sel_issuePriority.selectedOptionValue
						}
					},
					...demoData.data.records.filter(r => r.id !== lst_issues.triggeredItem.id)
				])
		} else {
			await updateQuery.run();
			await this.filteredData();
		}
		await closeModal('editIssue');
		showAlert('Issue Updated!', 'success');
	},

	// storeBaseID: async () => {
	// await storeValue('baseId', in_baseId.text);
	// return (appsmith.store.baseId)
	// },
	// 
	// storeTableName: async () => {
	// await storeValue('tableName', in_tableName.text);
	// return (appsmith.store.tableName)
	// },

	// storeInfo: async () => {
	// if (appsmith?.store?.baseId?.length == 0 && appsmith?.store?.tableName?.length == 0) {
	// return getBase1.data.records.map(record => {
	// let row = record.fields;
	// row['id'] = record.id;
	// return row;
	// })
	// } else {
	// await storeValue('baseId', in_baseId.text);
	// await storeValue('tableName', in_tableName.text);
	// await showAlert('Airtable details have been set!');
	// await getBase.run();
	// closeModal('mod_setup');
	// }
	// },

	generateId: function(type, length = 10) {
		let id;

		switch (type) {
			case 'random':
				let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				let charactersLength = characters.length;
				id = '';
				for (let i = 0; i < length; i++ ) {
					id += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
				break;

			case 'uuid':
				id = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => 
																									(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
				break;

			default:
				return null;
		}

		return id.toString();
	},

	addBug: async () => {
		if (creds.baseId.length == 0 && creds.tableName.length == 0) {
			demoData.setData(
				[
					...demoData.data.records,
					{
						id: this.generateId('random', 15),
						createdTime: new Date().toISOString(),
						fields: {
							Name: jsf_newIssue.formData.fields["Bug Title"], 
							Priority: jsf_newIssue.formData.fields["Priority"], 
							Status: jsf_newIssue.formData.fields["Status"], 
							Attachments: [{url: jsf_newIssue.formData.fields["Screenshots"][0]}],	
							Assigned_to: jsf_newIssue.formData.fields["Assigned To"], 
							Description: jsf_newIssue.formData.fields["Bug Description"], 
							Bug_source: jsf_newIssue.formData.fields["Bug Source"], 
							Associated_features: jsf_newIssue.formData.fields["Features Associated"], 
							Created_by: jsf_newIssue.formData.fields["Created by"]
						}
					}
				]
			)
		} else {
			InsertQuery.run();
		}
		await this.filteredData();
		closeModal('mod_createIssue');
		showAlert('Issue created successfully!', 'success');
	}
}