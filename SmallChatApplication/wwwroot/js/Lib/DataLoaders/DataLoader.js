import ApplicationDataLoader from "./ApplicationDataLoader.js";
import ContactListDataLoader from "./ContactListDataLoader.js";
import InfoPopupDataLoader from "./InfoPopupDataLoader.js";
import UpdateInfoPopupDataLoader from "./UpdateInfoPopupDataLoader.js";

export default class DataLoader {

    constructor() {
        this.elementName = {
            ApplicationNavbar: "ApplicationNavbar",
            ContactList: "ContactList",
            ConversationList: "ConversationList",
            Conversation: "Conversation",
            InfoPopup: "InfoPopup",
            UpdateInfoPopup: "UpdateInfoPopup"
        }
    }

    /**
     * This function take eleName that match with its corresponding element name to load user data.
     * There are 3 elements:
     * - ApplicationNavbar
     * - InfoPopup
     * - UpdateInfoPopup
     * 
     * @param {any} eleName
     * @param {any} userData
     */
    loadUserData(eleName, userData) {
        if (!userData) {
            throw new Error("User data is not valid");
        }
        switch (eleName) {
            case this.elementName.ApplicationNavbar:
                ApplicationDataLoader.loadUserData(userData);
                break;
            case this.elementName.InfoPopup:
                InfoPopupDataLoader.loadUserData(userData, InfoPopupDataLoader.USER_TYPE.SELF);
                break;
            case this.elementName.UpdateInfoPopup:
                UpdateInfoPopupDataLoader.loadUserData(userData);
                break;
            default:
                throw new Error("eleName is not valid in this function!");
        }
    }
    /**
     * 
     * @param {any} friendListData
     */
    loadFriendListData(friendListData) {
        if (!friendListData) {
            throw new Error("Friend list data is not valid");
        }

        ContactListDataLoader.loadFriendListData(friendListData);
    }

    /**
     * 
     * @param {any} friendRequestListData
     */
    loadFriendRequestData(friendRequestListData) {
        if (!friendRequestListData) {
            throw new Error("Friend request list data is not valid");
        }

        ContactListDataLoader.loadFriendRequestListData(friendRequestListData);
    }

}