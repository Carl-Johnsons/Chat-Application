
// Import SignalR as a module
import dataFacade from "../Lib/DataFacade/DataFacade.js";

let chatHubEndPoint = "/chatHub";
let connection;


class ChatHub {
    constructor() {
        this.actionType = {
            MapUserData: "MapUserData",
            SendIndividualMessage: "SendIndividualMessage",
            SendAcceptFriendRequest: "SendAcceptFriendRequest",
            SendFriendRequest: "SendFriendRequest",
            DeleteFriendRequest: "DeleteFriendRequest",
            NotifyUserTyping: "NotifyUserTyping",
            DisableNotifyUserTyping: "DisableNotifyUserTyping"
        };

        this.senderReceiverListModel = {
            senderIdList: [],
            receiverIdList: []
        }


        connection = new signalR.HubConnectionBuilder()
            .withUrl(chatHubEndPoint)
            .build();

        // render friendRequest real time
        connection.on("ReceiveFriendRequest", function () {
            dataFacade.loadFriendRequestList();
        });

        // render friend list real time

        connection.on("ReceiveAcceptFriendRequest", function () {
            dataFacade.loadFriendList();
        });

        connection.on("ReceiveIndividualMessage", function (newIndividualMessage) {
            //convert Pascal Case attribute (Violate json naming covention) into camel case
            let newMessageObj = convertToCamelCase(JSON.parse(newIndividualMessage));
            let senderId = dataFacade.getActiveConversationUserId();

            if (newIndividualMessage && senderId == newMessageObj?.message?.senderId) {
                console.log("active conversation: " + newMessageObj?.message?.senderId);
                dataFacade.loadConversation([newMessageObj], "New message");
            } else {
                console.log("the conversation didn't active: " + senderId + "|" + newMessageObj?.message?.senderId);
            }

        });

        connection.on("ReceiveNotifyUserTyping", function (model) {
            //Using the senderReceiverListModel
            dataFacade.displayUserInputNotification(model.senderIdList)
        });
        connection.on("ReceiveDisableNotifyUserTyping", function () {
            dataFacade.hideUserInputNotification();
        });


        function convertToCamelCase(obj) {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            if (Array.isArray(obj)) {
                return obj.map(item => convertToCamelCase(item));
            }

            return Object.keys(obj).reduce((acc, key) => {
                const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
                acc[camelCaseKey] = convertToCamelCase(obj[key]);
                return acc;
            }, {});
        }
    }

    async startConnection() {
        try {
            await connection.start();
        } catch (err) {
            console.error(err);
        }
    }
    notifyAction(action, data) {
        console.log({ action, data });
        connection.invoke(action, data)
            .catch(function (err) {
                console.error(`error when ${action}: ${err}`);
            });
    }
}

let connectionInstance = Object.freeze(new ChatHub());
export default connectionInstance;

