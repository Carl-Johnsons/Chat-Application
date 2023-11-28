
/**
 * Apply singleton pattern to solve the shared data problem
 */
let user;
let friendList;
let friendRequestList;
class User {
    constructor() {

    }
    setUser(userData) {
        user = userData;
    }
    getUser() {
        return user;
    }
    setFriendList(friendListData) {
        friendList = friendListData;
    }
    getFriendList() {
        return friendList;
    }
    setfriendRequestList(friendRequestListData) {
        friendRequestList = friendRequestListData;
    }
    getFriendRequestList() {
        return friendRequestList;
    }


}

const UserInstance = new User();
Object.freeze(UserInstance);

export default UserInstance;
