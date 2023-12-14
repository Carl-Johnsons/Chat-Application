export default class APIService {
    constructor() {
    }

    // USER API

    // ============================== GET Section ==============================
    /**
     * User json format
     *  "userId": 1,
     *  "phoneNumber": "",
     *  "password": "",
     *  "name": "",
     *  "dob": "",
     *  "gender": "Nam"
     *  "avatarUrl": "",
     *  "backgroundUrl": "",
     *  "introduction": "fix bug :(",
     *  "email": "",
     *  "active": true,
     *  "groupGroupDeputies": [],
     *  "groupGroupLeaders": [],
     *  "messages": []
     *
     * @param {any} userId
     * @returns
     */
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

    static searchUser(phoneNumber) {
        if (!phoneNumber) {
            throw new Error("Phone number is not valid");
        }
        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/Search/" + phoneNumber;
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
                reject(err);
            }
        });
    }

    /**
     * if you want only friend array, you can use this line
     * data.map(item => item.friendNavigation)
     * FriendList json format
     *  [
     *      {
     *          "userId": 1,
     *          "friendId": 3,
     *          "friendNavigation": {
     *              "userId": 3,
     *              "phoneNumber": "",
     *              "password": "",
     *              "name": "",
     *              "dob": "2002-11-02T00:00:00",
     *              "gender": "Nữ",
     *              "avatarUrl": "",
     *              "backgroundUrl": "",
     *              "introduction": "",
     *              "email": "",
     *              "active": true,
     *              "groupGroupDeputies": [],
     *              "groupGroupLeaders": [],
     *              "messages": []
     *          },
     *          "user": null
     *      }
     *  ]
     * @param {any} userId
     * @returns
     */
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




                // Only get friendNavigation then convert it to array
                //resolve(data.map(item => item.friendNavigation));

                //refactor later (Uncomment)
                //ChatApplicationNamespace.LoadFriendData(_FRIEND_LIST);
                //ChatApplicationNamespace.LoadConversationList(_FRIEND_LIST);


            } catch (err) {
                reject("Error getting friend list :" + err);
            }
        });
    }

    /**
     * If you want to get only the sender array, you can use this line of code:
     * data.map(item => item.sender)
     * Friend request json format
     * [
     *     {
     *         "senderId": 4,
     *         "receiverId": 3,
     *         "content": "string",
     *         "date": "2023-10-20T10:30:10.273",
     *         "status": "Pending",
     *         "receiver": null,
     *         "sender": {
     *             "userId": 4,
     *             "phoneNumber": "",
     *             "password": "",
     *             "name": "",
     *             "dob": "",
     *             "gender": "Nam",
     *             "avatarUrl": "",
     *             "backgroundUrl": "",
     *             "introduction": "",
     *             "email": "",
     *             "active": true,
     *             "groupGroupDeputies": [],
     *             "groupGroupLeaders": [],
     *             "messages": []
     *         }
     *     }
     * ]
     * @param {any} userId
     * @returns
     */
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

            } catch (err) {
                reject("Delete friend request error: " + err);
            }
        });
    }
    // ============================== PUT Section ==============================

    /**
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
    static deleteFriend(userId, friendId) {
        if (!userId || !friendId) {
            throw new Error("userId or friendId is not valid");
        }

        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Users/RemoveFriend/" + userId + "/" + friendId;
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

            } catch (err) {
                reject("Delete friend request error: " + err);
            }
        });
    }

    // MESSAGE API
    // ============================== GET Section ==============================


    /**
     * The individual message object is in json format. Ex:
     *   [
     *      {
     *         "messageId": 1,
     *         "userReceiverId": 2,
     *         "status": "string",
     *         "message": {
     *             "messageId": 1,
     *             "senderId": 1,
     *             "content": "Hello testing testing",
     *             "time": "2023-10-30T14:51:30.953",
     *             "messageType": "string",
     *             "messageFormat": "string",
     *             "active": true,
     *             "sender": null
     *         },
     *         "userReceiver": null
     *      }
     *   ]
     * @param {any} senderId
     * @param {any} receiverId
     * @returns
     */
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

    static getLastIndividualMessageList(senderId, receiverId) {
        if (!senderId || !receiverId) {
            throw new Error("sender id or receiver id is invalid");
        }
        return new Promise(async function (resolve, reject) {
            try {
                const url = _BASE_ADDRESS + "/api/Messages/GetLastIndividualMessage/" + senderId + "/" + receiverId;
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

                //refactor later (Uncomment)
                //ChatApplicationNamespace.LoadConversation(_MESSAGE_LIST, [senderId]);

            } catch (err) {
                reject("Get last individual message error:" + err);
            }
        });
    }

    // ============================== POST Section ==============================
    /**
     * The sender is the current User while the receiver is the other user
     * The messageContent is a string
     * @param {any} senderId
     * @param {any} receiverId
     * @param {any} messageContent
     * @returns
     */
    static sendIndividualMessage(senderId, receiverId, messageContent) {

        //For getting current time in js and formatt like this: 2023-10-30T17:15:22.234Z
        function getCurrentDateTimeInISO8601() {
            const now = new Date();

            // Extract date and time components
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

            // Build the ISO 8601 date-time string
            const iso8601DateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

            return iso8601DateTime;
        }
        return new Promise(async function (resolve, reject) {
            try {
                //individual message object
                let messageObject = {
                    userReceiverId: receiverId,
                    status: "string",
                    message: {
                        senderId: senderId,
                        content: messageContent,
                        time: getCurrentDateTimeInISO8601(),
                        messageType: "Individual",
                        messageFormat: "Text",
                        active: true
                    }
                };
                const url = _BASE_ADDRESS + "/api/Messages/SendIndividualMessage";
                const fetchConfig = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(messageObject)
                };
                const response = await fetch(url, fetchConfig);

                resolve(response);

            } catch (err) {
                reject(err);
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