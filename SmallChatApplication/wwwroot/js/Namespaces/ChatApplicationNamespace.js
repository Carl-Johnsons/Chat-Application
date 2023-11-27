

ChatApplicationNamespace.LoadUserData = function (user) {
    ApplicationNavbarNamespace.LoadData(user);
    ChatApplicationNamespace.LoadInfoPopupData(user, "Self");
    ChatApplicationNamespace.LoadUpdateInfoPopup(user);
}
ChatApplicationNamespace.LoadInfoPopupData = function (user, userType) {
    InfoPopupNamespace.LoadData(user, userType);
}
ChatApplicationNamespace.LoadUpdateInfoPopup = function (user) {
    UpdateInfoPopupNamespace.LoadData(user);
}
ChatApplicationNamespace.LoadFriendData = function (friendList) {
    ContactListNamespace.LoadFriendList(friendList);
}
ChatApplicationNamespace.LoadFriendRequestData = function (friendRequestList) {
    ContactListNamespace.LoadFriendRequestList(friendRequestList);
}

ChatApplicationNamespace.LoadConversationList = function (friendList) {
    ConservationListNamespace.LoadConversationList(friendList);
}
ChatApplicationNamespace.LoadConversation = function (messageList, userArrayId) {
    ConversationNamespace.LoadConversation(messageList, "RELOAD");
    ConversationNamespace.LoadConversationUserInfo(userArrayId)
};
ChatApplicationNamespace.LoadNewMessage = function (newMessage) {
    //this function accept an array so new message has to be an list message with one element
    ConversationNamespace.LoadConversation([newMessage], "NEW MESSAGE");
}


ChatApplicationNamespace.StartConnection = function () {
    _CONNECTION.start().then(function () {
        console.log("Connection successfully in client side")
        ChatApplicationNamespace.GetCurrentUser();
        ChatApplicationNamespace.GetFriendList();
        ChatApplicationNamespace.GetFriendRequestList();


    }).catch(function (err) {
        console.log("Connection to hub failed: " + err);
    });
}


//Load data of current user

ChatApplicationNamespace.GetCurrentUser = function () {
    $.ajax({
        url: _BASE_ADDRESS + "/api/Users/" + _USER_ID,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {

            //User json format
            /*
                "userId": 1,
                "phoneNumber": "",
                "password": "",
                "name": "",
                "dob": "",
                "gender": "Nam"
                "avatarUrl": "",
                "backgroundUrl": "",
                "introduction": "fix bug :(",
                "email": "",
                "active": true,
                "groupGroupDeputies": [],
                "groupGroupLeaders": [],
                "messages": []
            */
            _USER = data;

            //Use namespace so i can access other script file without having to include it here
            console.log("Map user data begin");

            _CONNECTION.invoke("MapUserData", data).catch(function (err) {
                console.error("error when send map user data: " + err.toString());
            });

            ChatApplicationNamespace.LoadUserData(_USER);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
ChatApplicationNamespace.GetUser = function (userId) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: _BASE_ADDRESS + "/api/Users/" + userId,
            dataType: 'json',
            type: 'GET',
            contentType: 'application/json',
            success: function (data, textStatus, jQxhr) {
                resolve(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });
}


ChatApplicationNamespace.GetFriendList = function () {
    //Load user's friend
    $.ajax({
        url: _BASE_ADDRESS + "/api/Users/GetFriend/" + _USER_ID,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {

            //FriendList json format
            // [
            //     {
            //         "userId": 1,
            //         "friendId": 3,
            //         "friendNavigation": {
            //             "userId": 3,
            //             "phoneNumber": "",
            //             "password": "",
            //             "name": "",
            //             "dob": "2002-11-02T00:00:00",
            //             "gender": "Nữ",
            //             "avatarUrl": "",
            //             "backgroundUrl": "",
            //             "introduction": "",
            //             "email": "",
            //             "active": true,
            //             "groupGroupDeputies": [],
            //             "groupGroupLeaders": [],
            //             "messages": []
            //         },
            //         "user": null
            //     }
            // ]


            // Only get friendNavigation then convert it to array
            _FRIEND_LIST = data.map(item => item.friendNavigation);
            console.log("Done loading _FRIEND_LIST");
            console.log({ _FRIEND_LIST });
            //Use namespace so i can access other script file without having to include it here
            ChatApplicationNamespace.LoadFriendData(_FRIEND_LIST);
            ChatApplicationNamespace.LoadConversationList(_FRIEND_LIST);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log("Error getting friend list :" + errorThrown);
        }
    });
};
ChatApplicationNamespace.GetFriendRequestList = function () {
    console.log("\nget friend request list\n");
    //Load user's friend
    $.ajax({
        url: _BASE_ADDRESS + "/api/Users/GetFriendRequestsByReceiverId/" + _USER_ID,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {

            //Friend request json format
            //[
            //    {
            //        "senderId": 4,
            //        "receiverId": 3,
            //        "content": "string",
            //        "date": "2023-10-20T10:30:10.273",
            //        "status": "Pending",
            //        "receiver": null,
            //        "sender": {
            //            "userId": 4,
            //            "phoneNumber": "",
            //            "password": "",
            //            "name": "",
            //            "dob": "",
            //            "gender": "Nam",
            //            "avatarUrl": "",
            //            "backgroundUrl": "",
            //            "introduction": "",
            //            "email": "",
            //            "active": true,
            //            "groupGroupDeputies": [],
            //            "groupGroupLeaders": [],
            //            "messages": []
            //        }
            //    }
            //]


            // Only get sender then convert it to array
            _FRIEND_REQUEST_LIST = data.map(item => item.sender);
            console.log("Done loading _FRIEND_REQUEST_LIST");
            console.log({ _FRIEND_REQUEST_LIST });
            //Use namespace so i can access other script file without having to include it here
            ChatApplicationNamespace.LoadFriendRequestData(_FRIEND_REQUEST_LIST);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            if (jqXhr.status === 404) {
                //set empty array so the website will work normaly
                _FRIEND_REQUEST_LIST = [];
                ChatApplicationNamespace.LoadFriendRequestData(_FRIEND_REQUEST_LIST);
                console.log("No friend request found!");
            } else {
                // Handle other types of errors
                console.log("Error getting friend list: " + errorThrown);
            }
        }
    });
}
ChatApplicationNamespace.GetMessageList = function (senderId) {
    console.log("Get message list");

    $.ajax({
        url: _BASE_ADDRESS + "/api/Messages/GetIndividualMessage/" + senderId + "/" + _USER_ID,
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json',
        success: function (data, textStatus, jQxhr) {
            //MessageList json format
            //[
            //    {
            //        "messageId": 1,
            //        "userReceiverId": 2,
            //        "status": "string",
            //        "message": {
            //            "messageId": 1,
            //            "senderId": 1,
            //            "content": "Hello testing testing",
            //            "time": "2023-10-30T14:51:30.953",
            //            "messageType": "string",
            //            "messageFormat": "string",
            //            "active": true,
            //            "sender": null
            //        },
            //        "userReceiver": null
            //    }
            //]

            _MESSAGE_LIST = data;
            console.log("Done loading _MESSAGE_LIST");
            console.log({ _MESSAGE_LIST });
            //Use namespace so i can access other script file without having to include it here
            ChatApplicationNamespace.LoadConversation(_MESSAGE_LIST, [senderId]);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            if (jqXhr.status === 404) {
                console.log("No messageList found!");
            } else {
                // Handle other types of errors
                console.log("Error getting MessageList: " + errorThrown);
            }
            //set empty array so the website will work normaly
            _MESSAGE_LIST = []
            ChatApplicationNamespace.LoadConversation(_MESSAGE_LIST, [senderId]);
        }
    });
}



//Start connection here
$(document).ready(function () {
    ChatApplicationNamespace.StartConnection();
});