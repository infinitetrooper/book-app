export default {
  storeSID: async () => {
    await storeValue("sid", SID.text);
    return appsmith.store.sid;
  },

  storePhoneNumber: async () => {
    await storeValue("phone_number", phone_number.text);
    return appsmith.store.phone_number;
  },

  storeWhatsAppNumber: async () => {
    await storeValue("whatsApp_number", whatsapp_number.text);
    return appsmith.store.whatsapp_number;
  },

  storeInfo: async () => {
    await storeValue("sid", SID.text);
    await storeValue("phone_number", phone_number.text);
    await storeValue("whatsApp_number", whatsapp_number.text);
    showAlert("API details have been set!");
    closeModal("APISetup");
  },

  getCustomernames: () => {
    const namesArray = Table1.selectedRows.map((row) => row.name);
    const names = namesArray.toString();
    return names;
  },

  sendSMSFunc: async () => {
    const mode = MultiSelect1.selectedOptionValues;
    if (mode.includes("SMS")) {
      const selectedNums1 = Table1?.selectedRows?.map((row) => row?.sms_number);
      const selectedNums = [...selectedNums1, appsmith.store.sms];
      selectedNums.forEach((num) => {
        sendSMS.run({ num });
      });
    } else {
      return "SMS was not selected";
    }
  },

  sendWhatsAppFunc: async () => {
    const mode = MultiSelect1.selectedOptionValues;
    if (mode.includes("WhatsApp")) {
      const selectedNums1 = Table1?.selectedRows?.map(
        (row) => row?.whatsapp_number
      );
      const selectedNums = [...selectedNums1, appsmith.store.whatsapp];
      selectedNums.forEach((num1) => {
        sendWhatsApp.run({ num1 });
      });
    } else {
      return "Whatsapp was not selected";
    }
  },
  selectedMessages: () => {
    return getMessages.data.filter((word) =>
      word.type
        .toLowerCase()
        .includes(MessageType.selectedOptionValue.toLowerCase())
    );
  },

  openSetup: async () => {
    if (appsmith.mode == "EDIT") {
      if (appsmith?.store?.userFork_CMT == true) {
        return "User has already forked this template once";
      }
      showModal("APISetup");
      await storeValue("userFork_CMT", true);
    }
  },
  myFun1: () => {
    if (List2.selectedItem.name == "SMS") {
      return "#52525b";
    } else if (List2.selectedItem.name == "Whatsapp") {
      return "#16a34a";
    } else {
      return "#2563eb";
    }
  },
  getMode: () => {
    if (appsmith.store.mode == "SMS") {
      return [
        {
          id: "002",
          name: "SMS",
          img: "https://cdn-icons-png.flaticon.com/512/733/733533.png",
        },
      ];
    } else if (appsmith.store.mode == "WhatsApp") {
      return [
        {
          id: "001",
          name: "Whatsapp",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png",
        },
      ];
    } else {
      return [
        {
          id: "001",
          name: "Whatsapp",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png",
        },
        {
          id: "002",
          name: "SMS",
          img: "https://cdn-icons-png.flaticon.com/512/733/733533.png",
        },
      ];
    }
  },
	sendMessagesButton:() => {
		JSObject1.sendSMSFunc();
		JSObject1.sendWhatsAppFunc();
		showModal('CommonModal')
	}
};
