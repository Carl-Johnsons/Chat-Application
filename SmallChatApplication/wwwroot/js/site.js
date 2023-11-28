import APIService from "./Lib/APIService/APIService.js";
import DataLoader from "./Lib/DataLoaders/DataLoader.js";
import UserInstance from "./Models/User.js";


const createGetPromise = (request, successCallBack, errorCallBack) =>
    request
        .then(res => res.json())
        .then(successCallBack)
        .catch(errorCallBack);

const getUserPromise = createGetPromise(
    APIService.getUser(_USER_ID),
    userData => UserInstance.setUser(userData),
    err => console.error(err)
);

const getFriendListPromise = createGetPromise(
    APIService.getFriendList(_USER_ID),
    data => UserInstance.setFriendList(data.map(item => item.friendNavigation)),
    err => {
        UserInstance.setFriendList([]);
        console.error(err);
    }
);
const getFriendRequestPromise = createGetPromise(
    APIService.getFriendRequestList(_USER_ID),
    data => UserInstance.setfriendRequestList(data.map(item => item.sender)),
    err => {
        UserInstance.setfriendRequestList([]);
        console.error(err);
    }
);

//Wait all the promise done than load data at once
Promise.all(
    [
        getUserPromise,
        getFriendListPromise,
        getFriendRequestPromise
    ])
    .then(loadData)
    .catch(err => console.error(err));

function loadData() {
    console.log("Load user data");
    let user = UserInstance.getUser();
    let friendList = UserInstance.getFriendList();
    let friendRequestList = UserInstance.getFriendRequestList();
    DataLoader.loadUserData(DataLoader.elementName.ApplicationNavbar, user);
    DataLoader.loadUserData(DataLoader.elementName.InfoPopup, user);
    DataLoader.loadUserData(DataLoader.elementName.UpdateInfoPopup, user);

    DataLoader.loadFriendListData(friendList);
    DataLoader.loadFriendRequestData(friendRequestList);
}


