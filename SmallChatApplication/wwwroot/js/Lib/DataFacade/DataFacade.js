
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
    #createGetPromise(request, successCallBack, errorCallBack) {
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
        }
        DataLoader.loadUserData(DataLoader.elementName.ApplicationNavbar, userData);
        DataLoader.loadUserData(DataLoader.elementName.InfoPopup, userData);
        DataLoader.loadUserData(DataLoader.elementName.UpdateInfoPopup, userData);
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
     * This function will search user based on phone number
     * @param {any} phoneNumber
     * @returns
     */
    async fetchSearchUser(phoneNumber) {
        if (!phoneNumber) {
            throw new Error("Phone number is not valid");
        }
        let user;
        await this.#createGetPromise(
            APIService.searchUser(phoneNumber),
            userData => user = userData,
            err => console.error(err)
        );

        return user;
    }
    async loadFriendList(friendList) {
        if (friendList === undefined) {
            friendList = await this.fetchFriendList();
            //Update the shared data
            UserInstance.setFriendList(friendList);
        }
        DataLoader.loadFriendListData(friendList);
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

    // ============================== FETCH SECTION ============================

    /**
     * This will call the API service then return the user data
     * @param {any} userId
     * @returns
     */
    async fetchUser(userId = _USER_ID) {
        let user;

        await this.#createGetPromise(
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

        await this.#createGetPromise(
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

        await this.#createGetPromise(
            APIService.getFriendRequestList(userId),
            data => friendRequestList = data.map(item => item.sender),
            err => {
                friendRequestList = [];
                console.error(err);
            }
        );
        return friendRequestList;
    }
    async fetchSendFriendRequest(sender, receiverId) {
        try {
            let response = await APIService.sendFriendRequest(sender, receiverId);
            if (!response.ok) {
                throw new Error("send friend request failed!");
            }
            console.log("send friend request successfully!");
        } catch (err) {
            console.error(err);
        }
    }
    async fetchDeleteFriendRequest(senderId, receiverId) {
        try {
            let response = await APIService.deleteFriendRequest(senderId, receiverId);
            if (!response.ok) {
                throw new Error("delete friend request failed");
            }
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
}

const dataFacade = new DataFacade();
Object.freeze(dataFacade);

export default dataFacade;

