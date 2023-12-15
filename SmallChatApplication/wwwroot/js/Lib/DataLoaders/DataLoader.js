import ApplicationDataLoader from "./ApplicationDataLoader.js";
import ContactListDataLoader from "./ContactListDataLoader.js";
import ConversationDataLoader from "./ConversationDataLoader.js";
import ConversationListDataLoader from "./ConversationListDataLoader.js";
import InfoModalDataLoader from "./InfoModalDataLoader.js";
import UpdateInfoModalDataLoader from "./UpdateInfoModalDataLoader.js";

export default class DataLoader {
    static elementName = {
        ApplicationNavbar: "ApplicationNavbar",
        ContactList: "ContactList",
        ConversationList: "ConversationList",
        Conversation: "Conversation",
        InfoModal: "InfoModal",
        UpdateInfoModal: "UpdateInfoModal"
    }

    constructor() {

    }

    /**
     * This function take eleName that match with its corresponding element name to load user data.
     * There are 3 elements:
     * - ApplicationNavbar
     * - InfoModal
     * - UpdateInfoModal
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
            case this.elementName.InfoModal:
                InfoModalDataLoader.loadUserData(userData, InfoModalDataLoader.USER_TYPE.SELF);
                break;
            case this.elementName.UpdateInfoModal:
                UpdateInfoModalDataLoader.loadUserData(userData);
                break;
            default:
                throw new Error("eleName is not valid in this function!");
        }
    }
    /**
     * Load friend data into InfoModal component
     * @param {any} userData
     */

    static loadFriendData(userData) {
        if (!userData) {
            throw new Error("User data is not valid");
        }

        InfoModalDataLoader.loadUserData(userData, InfoModalDataLoader.USER_TYPE.FRIEND);
    }

    /**
     * Load friend data into InfoModal component
     * @param {any} userData
     */
    static loadStrangerData(userData) {
        if (!userData) {
            throw new Error("User data is not valid");
        }
        InfoModalDataLoader.loadUserData(userData, InfoModalDataLoader.USER_TYPE.STRANGER);
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
    /**
     * This function will load the friend list to the ConversationList Component
     * @param {any} friendList
     */
    static loadConversationListData(friendList) {
        if (!friendList) {
            throw new Error("friendList data is not valid");
        }
        ConversationListDataLoader.loadConversationList(friendList);
    }
    static updateLastMessage(friendId, lastMessage) {
        ConversationListDataLoader.updateLastMessage(friendId, lastMessage);
    }
    static loadConversationData(messageList, mode) {
        ConversationDataLoader.loadConversation(messageList, mode);
    }
    static displayUserInputNotification(senderIdList) {
        ConversationDataLoader.displayUserInputNotification(senderIdList);
    }
    static hideUserInputNotification() {
        ConversationDataLoader.hideUserInputNotification();
    }


}