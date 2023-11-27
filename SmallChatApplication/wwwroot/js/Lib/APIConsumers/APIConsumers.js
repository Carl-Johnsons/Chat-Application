﻿export default class APIConsumer {
    constructor() {
    }

    // USER API

    // ============================== GET Section ==============================
    static getUser(userId) {
        if (!userId) {
            throw new Error("User id is not valid!");
        }

        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/" + userId;
                const fetchConfig = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const response = await fetch(url, fetchConfig);
                if (!response.ok) {
                    throw new Error("Fetch error: " + response.statusText);
                }

                resolve(response);
            } catch (err) {
                reject("Get user error:" + err);
            }
        });
    }
    static getFriendList(userId) {
        if (!userId) {
            throw new Error("User id is not valid!");
        }

        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/GetFriend/" + userId;
                const fetchConfig = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const response = await fetch(url, fetchConfig);
                if (!response.ok) {
                    throw new Error("Fetch error: " + response.statusText);
                }

                resolve(response);

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
                //resolve(data.map(item => item.friendNavigation));
                //Use namespace so i can access other script file without having to include it here

                //refactor later (Uncomment)
                //ChatApplicationNamespace.LoadFriendData(_FRIEND_LIST);
                //ChatApplicationNamespace.LoadConversationList(_FRIEND_LIST);


            } catch (err) {
                reject("Error getting friend list :" + err);
            }
        });
    }
    static getFriendRequestList(userId) {
        if (!userId) {
            throw new Error("userId is not valid");
        }
        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/GetFriendRequestsByReceiverId/" + userId;
                const fetchConfig = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const response = await fetch(url, fetchConfig);
                if (!response.ok) {
                    throw new Error("Fetch error: " + response.statusText);
                }

                resolve(response);
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


                // Only get sender data then convert it to array
                resolve(data.map(item => item.sender));

                //refactor later (Uncomment)
                //ChatApplicationNamespace.LoadFriendRequestData(_FRIEND_REQUEST_LIST);
            } catch (err) {
                reject("Get user error:" + err);
                //refactor later
                //if (jqXhr.status === 404) {
                //    //set empty array so the website will work normaly
                //    _FRIEND_REQUEST_LIST = [];
                //    ChatApplicationNamespace.LoadFriendRequestData(_FRIEND_REQUEST_LIST);
                //    console.log("No friend request found!");
                //} else {
                //    // Handle other types of errors
                //    console.log("Error getting friend list: " + errorThrown);
                //}
            }
        });
    }

    // ============================== POST Section ==============================
    /**
     * send friend request using fetch API
     * @param {any} user
     * @param {any} receiverId
     * @returns
     */
    static sendFriendRequest(user, receiverId) {

        if (!user || !receiverId) {
            throw new Error("User or receiverId is not valid");
        }

        return new Promise(async function (resolve, reject) {
            try {
                let friendRequest = {
                    senderId: user.userId,
                    receiverId: receiverId,
                    content: "Xin chào! tôi là " + user.name
                };


                const url = _BASE_ADDRESS + "/api/Users/SendFriendRequest";
                const fetchConfig = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(friendRequest)
                };

                const response = await fetch(url, fetchConfig);
                resolve(response);
                // Friend Request JSON format
                //{
                //    "senderId": 1,
                //    "receiverId": 3,
                //    "content": "string",
                //    "date": "2023-10-20T23:40:53.8730141+07:00",
                //    "status": "Pending",
                //    "receiver": null,
                //    "sender": null
                //}

                //refactor later
                // Notfiy other user if they are online
                //_CONNECTION.invoke("SendFriendRequest", data).catch(function (err) {
                //    console.error("error when SendFriendRequest: " + err.toString());
                //});
                // The data is FriendRequest datatype

                //This user send to other user friend request, so don't need to render the friend request here
                //ChatApplicationNamespace.GetFriendRequestList();
                resolve(jQxhr);
            } catch (err) {
                reject("Fetch error: " + err);
            }
        });
    }

    /**
     * Add a friend using fetch API
     * - Sender is the one who send the friend request
     * - Receiver is the one who accept the friend request
     * @param {any} senderId
     * @param {any} receiverId
     * @returns
     */
    static addFriend(senderId, receiverId) {

        if (!senderId) {
            throw new Error("senderId is not valid");
        }
        // Sender is the one who send the request not the current user
        // The current user is the one who accept the friend request
        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/AddFriend/" + senderId + "/" + receiverId;
                const fetchConfig = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const response = await fetch(url, fetchConfig);
                resolve(response);



                //refactor later
                //Notify who sent the friend request that they are friend
                //_CONNECTION.invoke("SendAcceptFriendRequest", senderId).catch(function (err) {
                //    console.log("Error when notify add friend");
                //});
                //refactor later
                //Updating friend request list in who accept friend request sides
                //ChatApplicationNamespace.GetFriendList();
                //ChatApplicationNamespace.GetFriendRequestList();
            } catch (err) {
                reject("Delete friend request error: " + err);
            }
        });
    }
    // ============================== PUT Section ==============================

    /**
     * Update an user using AJAX
     * @param {any} user
     * @returns 
     */
    static updateUser(user) {
        if (!user) {
            throw new Error("User data is not valid");
        }
        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/" + user.userId;
                const fetchConfig = {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                };

                const response = await fetch(url, fetchConfig);
                resolve(response);
            } catch (err) {
                reject("Fetch error: " + err);
            }
        });
    }

    // ============================== DELETE Section ==============================
    static deleteFriend(senderId, receiverId) {
        if (!senderId || !receiverId) {
            throw new Error("SenderId or receiverId is not valid");
        }

        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/RemoveFriend/" + senderId + "/" + receiverId;
                const fetchConfig = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const response = await fetch(url, fetchConfig);
                resolve(response);

                //refactor later
                //Notify other user
                //_CONNECTION.invoke("DeleteFriend", friendObject.userId).catch(function (err) {
                //    console.log("Error when notify deleting friend");
                //});

                //refactor later
                //Updating friend list
                //ChatApplicationNamespace.GetFriendList();




            } catch (err) {
                reject("Delete Friend Error:" + err);
            }
        });
    }
    static deleteFriendRequest(senderId, receiverId) {

        if (!senderId || !receiverId) {
            throw new Error("SenderId or receiverId is not valid");
        }

        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/RemoveFriendRequest/" + senderId + "/" + receiverId;
                const fetchConfig = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const response = await fetch(url, fetchConfig);
                resolve(response);

                //Notify other user
                //_CONNECTION.invoke("DeleteFriendRequest", friendObject.userId).catch(function (err) {
                //    console.log("Error when notify deleting friend");
                //});

                //refactor later
                //Updating friend request list
                //ChatApplicationNamespace.GetFriendRequestList();
            } catch (err) {
                reject("Delete friend request error: " + err);
            }
        });
    }

    // MESSAGE API
    // ============================== GET Section ==============================
    static getIndividualMessageList(senderId, receiverId) {
        if (!senderId || !receiverId) {
            throw new Error("sender id or receiver id is invalid");
        }
        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Messages/GetIndividualMessage/" + senderId + "/" + receiverId;
                const fetchConfig = {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                const response = await fetch(url, fetchConfig);
                if (!response.ok) {
                    throw new Error("Fetch error: " + response.statusText);
                }

                resolve(response);

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

                //refactor later (Uncomment)
                //ChatApplicationNamespace.LoadConversation(_MESSAGE_LIST, [senderId]);

            } catch (err) {
                reject("Get individual message error:" + err);

                //refactor later (Uncomment)
                //if (jqXhr.status === 404) {
                //    console.log("No messageList found!");
                //} else {
                //    // Handle other types of errors
                //    console.log("Error getting MessageList: " + errorThrown);
                //}
                ////set empty array so the website will work normaly
                //_MESSAGE_LIST = []
                //ChatApplicationNamespace.LoadConversation(_MESSAGE_LIST, [senderId]);
            }
        });
    }

    // TOOL API
    // ============================== POST Section ==============================

    /**
     * Upload an img using fetch API
     * @param {any} file
     * @returns
     */
    static uploadImage(file) {
        if (!file) {
            console.log("file is invalid");
        }
        return new Promise(async function (resolve, reject) {
            const url = _BASE_ADDRESS + "/api/Tools/UploadImageImgur/";

            const formData = new FormData();
            formData.append("ImageFile", file);

            const response = await fetch(url, {
                method: "POST",
                headers: {

                },
                body: formData
            });

            if (!response.ok) {
                const error = await response.text();
                reject(`Error: ${error}`);
            }

            const result = await response.text();
            resolve(result);
        });
    }
}