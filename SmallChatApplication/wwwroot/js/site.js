import APIConsumer from "./Lib/APIConsumers/APIConsumers.js";
import DataLoader from "./Lib/DataLoaders/DataLoader.js";

const DATA_LOADER = new DataLoader();
//Set the global variable to use in partial view
var _USER;
var _FRIEND_LIST;
var _FRIEND_REQUEST_LIST;
var _MESSAGE_LIST;

APIConsumer.getUser(_USER_ID)
    .then(res => res.json())
    .then(data => {
        console.log({ data });

        _USER = data;
        console.log(_USER);
        DATA_LOADER.loadUserData(DATA_LOADER.elementName.ApplicationNavbar, _USER);
        DATA_LOADER.loadUserData(DATA_LOADER.elementName.InfoPopup, _USER);
        DATA_LOADER.loadUserData(DATA_LOADER.elementName.UpdateInfoPopup, _USER);
    });

