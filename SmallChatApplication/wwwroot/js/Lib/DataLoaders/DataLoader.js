import ApplicationDataLoader from "./ApplicationDataLoader.js";
import ContactListDataLoader from "./ContactListDataLoader.js";
import InfoPopupDataLoader from "./InfoPopupDataLoader.js";
import UpdateInfoPopupDataLoader from "./UpdateInfoPopupDataLoader.js";

export default class DataLoader {
    static elementName = {
        ApplicationNavbar: "ApplicationNavbar",
        ContactList: "ContactList",
        ConversationList: "ConversationList",
        Conversation: "Conversation",
        InfoPopup: "InfoPopup",
        UpdateInfoPopup: "UpdateInfoPopup"
    }

    constructor() {

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
    static loadUserData(eleName, userData) {
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
     * Load friend data into InfoPopup component
     * @param {any} userData
     */

    static loadFriendData(userData) {
        if (!userData) {
            throw new Error("User data is not valid");
        }

        InfoPopupDataLoader.loadUserData(userData, InfoPopupDataLoader.USER_TYPE.FRIEND);
    }

    /**
     * Load friend data into InfoPopup component
     * @param {any} userData
     */
    static loadStrangerData(userData) {
        if (!userData) {
            throw new Error("User data is not valid");
        }
        InfoPopupDataLoader.loadUserData(userData, InfoPopupDataLoader.USER_TYPE.STRANGER);
    }


    /**
     * This function will load the friend list in the ContactList Component
     * @param {any} friendListData
     */
    static loadFriendListData(friendListData) {
        if (!friendListData) {
            throw new Error("Friend list data is not valid");
        }

        ContactListDataLoader.loadFriendListData(friendListData);
    }

    /**
     * This function will load the friend request list in the ContactList Component
     * @param {any} friendRequestListData
     */
    static loadFriendRequestData(friendRequestListData) {
        if (!friendRequestListData) {
            throw new Error("Friend request list data is not valid");
        }

        ContactListDataLoader.loadFriendRequestListData(friendRequestListData);
    }

}