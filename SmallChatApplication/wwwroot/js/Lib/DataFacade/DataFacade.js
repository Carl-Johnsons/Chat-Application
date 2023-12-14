
import connectionInstance from "../../Models/ChatHub.js";
import UserInstance from "../../Models/User.js";
import APIService from "../APIService/APIService.js";
import DataLoader from "../DataLoaders/DataLoader.js";

class DataFacade {
    constructor() {
    }
    /**
     * For shorter promise, improve readability
     * @param {any} request
     * @param {any} successCallBack
     * @param {any} errorCallBack
     * @returns
     */
    #createPromise(request, successCallBack, errorCallBack) {
        return request
            .then(res => res.json())
            .then(successCallBack)
            .catch(errorCallBack);
    }

    /**
     * - This method will load the userData 
     * or reload if the userData is not passed as an parameter
     * - This method will call API if the userData is undefined
     * then call DataLoader load the data into DOMElement
     * @param {any} userData
     */
    async loadUser(userData) {
        if (!userData) {
            userData = await this.fetchUser();
            //Update the shared data
            UserInstance.setUser(userData);
            console.log("Set user");
        }
        DataLoader.loadUserData(DataLoader.elementName.ApplicationNavbar, userData);
        DataLoader.loadUserData(DataLoader.elementName.InfoPopup, userData);
        DataLoader.loadUserData(DataLoader.elementName.UpdateInfoPopup, userData);
        connectionInstance.notifyAction(connectionInstance.actionType.MapUserData, userData);
    }
    async searchUser(phoneNumber) {
        let searchResult = await this.fetchSearchUser(phoneNumber);
        let currentUser = UserInstance.getUser();
        //The search result is a current user
        if (searchResult.userId === currentUser.userId) {
            DataLoader.loadUserData(DataLoader.elementName.InfoPopup, searchResult);
            return;
        }
        //The search result is a friend of the user
        let friendList = UserInstance.getFriendList();
        for (let friend of friendList) {
            if (searchResult.userId === friend.userId) {
                DataLoader.loadFriendData(searchResult);
                return;
            }
        }
        //The search result is a stranger
        DataLoader.loadStrangerData(searchResult);
    }
    async loadFriendDataToInfoPopup(friendId) {
        if (!friendId) {
            throw new Error("friendId is not valid");
        }
        DataLoader.loadFriendData(await this.fetchUser(friendId));
    }
    /**
     * This function will call the API to get the friendList if undefined
     * then load the data to the ContactList Component and the Conversation List Component
     * @param {any} friendList
     */
    async loadFriendList(friendList) {
        if (friendList === undefined) {
            friendList = await this.fetchFriendList();
            //Update the shared data
            UserInstance.setFriendList(friendList);
        }
        DataLoader.loadFriendListData(friendList);
        DataLoader.loadConversationListData(friendList);
    }

    /**
     * This function will update the last message that display in the conversation list.
     * If the lastMessage is undefined this method will automatically fetch the last message from the api
     * @param {int} friendId
     * @param {any} lastMessage
     */
    async updateLastMessage(friendId, lastMessage) {
        if (lastMessage === undefined) {
            lastMessage = await this.fetchLastIndividualMessage(UserInstance.getUser().userId, friendId);
        }
        DataLoader.updateLastMessage(friendId, lastMessage);
    }

    /**
     * - This method will load the friendRequestData 
     * or reload if the friendRequestData is not passed as an parameter
     * - This method will call API to get data if the friendRequestData is undefined
     * then call DataLoader load the data into DOMElement
     * @param {any} friendRequestList
     */
    async loadFriendRequestList(friendRequestList) {
        if (friendRequestList === undefined) {
            friendRequestList = await this.fetchFriendRequestList();
            //Update the shared data
            UserInstance.setfriendRequestList(friendRequestList);
        }
        DataLoader.loadFriendRequestData(friendRequestList);
    }
    async loadConversation(messageList, mode) {
        if (!messageList) {
            let otherUserId = this.getActiveConversationUserId();
            if (!otherUserId) {
                console.log("No active conversation!");
                return;
            }
            messageList = await this.fetchIndividualMessageList(otherUserId, UserInstance.getUser().userId);
        }
        DataLoader.loadConversationData(messageList, mode);
    }
    async sendMessage(senderId, receiverId, messageContent) {
        let newMessage = await this.fetchSendIndividualMessage(senderId, receiverId, messageContent);
        this.loadConversation([newMessage], "New message");
    }

    // ============================== FETCH SECTION ============================

    /**
     * This will call the API service then return the user data
     * @param {any} userId
     * @returns
     */
    async fetchUser(userId = _USER_ID) {
        let user;

        await this.#createPromise(
            APIService.getUser(userId),
            userData => user = userData,
            err => console.error(err)
        );

        return user;
    }
    /**
      * This will call the API service then return the friend list array
      * and it will map to only get the friendNavigation array
      * @param {any} userId
      * @returns
      */
    async fetchFriendList(userId = _USER_ID) {
        let friendList;

        await this.#createPromise(
            APIService.getFriendList(userId),
            data => friendList = data.map(item => item.friendNavigation),
            err => {
                friendList = [];
                console.error(err);
            }
        );
        return friendList;
    }
    /**
     * 
     * @param {any} userId
     */
    async fetchFriendRequestList(userId = _USER_ID) {
        let friendRequestList;

        await this.#createPromise(
            APIService.getFriendRequestList(userId),
            data => friendRequestList = data.map(item => item.sender),
            err => {
                friendRequestList = [];
                console.error(err);
            }
        );
        return friendRequestList;
    }
    /**
     * This function will search user based on phone number
     * @param {any} phoneNumber
     * @returns
     */
    async fetchSearchUser(phoneNumber) {
        if (!phoneNumber) {
            throw new Error("Phone number is not valid");
        }
        let user;
        await this.#createPromise(
            APIService.searchUser(phoneNumber),
            userData => user = userData,
            err => console.error(err)
        );

        return user;
    }
    async fetchUpdateUser(user) {
        try {
            const res = await APIService.updateUser(user);
            if (!res.ok) {
                throw new Error("Update user failed!\n" + res.status);
            }
            console.log("Update user succcessfully!");
        } catch (err) {
            console.error(err);
        }
    }
    async fetchSendFriendRequest(sender, receiverId) {
        let friendRequest;
        await this.#createPromise(
            APIService.sendFriendRequest(sender, receiverId),
            friendRequestData => friendRequest = friendRequestData,
            err => console.error(err)
        );
        connectionInstance.notifyAction(connectionInstance.actionType.SendFriendRequest, friendRequest);

        return friendRequest;

    }
    async fetchDeleteFriendRequest(senderId, receiverId) {
        try {
            let response = await APIService.deleteFriendRequest(senderId, receiverId);
            if (!response.ok) {
                throw new Error("delete friend request failed");
            }
            connectionInstance.notifyAction(connectionInstance.actionType.DeleteFriendRequest, friendObject.userId);
            console.log("delete friend request successfully");
        } catch (err) {
            console.error(err);
        }
    }
    async fetchAddFriend(senderId, receiverId) {
        try {
            let response = await APIService.addFriend(senderId, receiverId);
            if (!response.ok) {
                throw new Error("add friend failed: " + response.status);
            }
            //Notify other user
            connectionInstance.notifyAction(connectionInstance.actionType.SendAcceptFriendRequest, senderId);
            console.log("add friend successfully");
        } catch (err) {
            console.error(err);
        }
    }
    async fetchDeleteFriend(userId, friendId) {
        try {
            let response = await APIService.deleteFriend(userId, friendId);
            if (!response.ok) {
                throw new Error("Something is wrong!: " + response.status);
            }
            console.log("Delete friend: " + friendId + " successufully!");

        } catch (err) {
            console.error(err);
        }
    }
    /**
     * The other user is the sender while the current user is the reciever
     * @param {any} senderId
     * @param {any} receiverId
     * @returns
     */
    async fetchIndividualMessageList(senderId, receiverId) {
        if (!senderId || !receiverId) {
            throw new Error("senderId or receiverId is not valid");
        }
        let messageList;
        await this.#createPromise(
            APIService.getIndividualMessageList(senderId, receiverId),
            data => messageList = data,
            err => console.error(err)
        );

        return messageList;
    }
    async fetchLastIndividualMessage(senderId, receiverId) {
        if (!senderId || !receiverId) {
            throw new Error("senderId or receiverId is not valid");
        }
        let lastMessage;
        await this.#createPromise(
            APIService.getLastIndividualMessageList(senderId, receiverId),
            data => lastMessage = data,
            err => console.error(err)
        );

        return lastMessage;
    }
    async fetchSendIndividualMessage(senderId, receiverId, messageContent) {
        let newMessage;
        await this.#createPromise(
            APIService.sendIndividualMessage(senderId, receiverId, messageContent),
            data => {
                newMessage = data
                console.log(data);
            },
            err => console.error(err)
        );
        connectionInstance.notifyAction(connectionInstance.actionType.SendIndividualMessage, newMessage);

        return newMessage;
    }

    // ================================ Other Section ===========================
    /**
     * This function will return the active conversation userId
     * @returns {userId}
     */
    getActiveConversationUserId() {
        const CONVERSATION_LIST_CONTAINER = $(".conversations-list-container");
        let activeConversation = CONVERSATION_LIST_CONTAINER.find("div.conversation.active");
        let userId = $(activeConversation).attr("data-user-id");

        return parseInt(userId);
    }

    /**
     * For notify other user that this current user is typing in the conversation
     * @param {any} usernameArray
     */
    displayUserInputNotification(senderIdList) {
        DataLoader.displayUserInputNotification(senderIdList);
    }
    hideUserInputNotification() {
        DataLoader.hideUserInputNotification();
    }
}

const dataFacade = new DataFacade();
Object.freeze(dataFacade);

export default dataFacade;

