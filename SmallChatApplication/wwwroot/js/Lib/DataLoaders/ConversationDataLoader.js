import UserInstance from "../../Models/User.js";
import dataFacade from "../DataFacade/DataFacade.js";
import HTMLGenerator from "../Generators/HTMLGenerator.js";

export default class ConversationDataLoader {
    static MODE = {
        RELOAD: "Reload",
        NEW_MESSAGE: "New message"
    }
    static #CHAT_BOX_CONTAINER = $(".chat-box-container");
    static #CONVERSATION_CONTAINER = $(this.#CHAT_BOX_CONTAINER).find(".conversation-container");
    static #MESSAGE_CONTAINER = this.#CONVERSATION_CONTAINER.find(".message-container");
    static #USER_INPUT_NOTIFICATION = this.#CONVERSATION_CONTAINER.find(".user-input-notification");
    static #INPUT_MESSAGE_CONTAINER = this.#CHAT_BOX_CONTAINER.find(".input-message-container");
    static #generateElement = HTMLGenerator.generateElement;
    static #userMap = new Map();
    constructor() {

    }

    /**
     * Load the conversation to the message container
     * There are 2 mode:
     * - Reload: Replace the message container with the new messageList
     * - New message: Append the new messageList to the existing message
     * @param {any} messageList
     * @param {any} mode
     */
    static async loadConversation(messageList, mode) {
        this.#userMap.clear();
        // Show the "send message" button even the message array is zero
        $(this.#INPUT_MESSAGE_CONTAINER).show();
        await this.#loadConversation(messageList, mode);
        this.#loadConversationUserInfo();
        console.log("Done loading message");
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

        // <div class="message-item">
        //     <div class="user-avatar">
        //         <img class="avatar-image" src="~/img/user.png" />
        //     </div>
        //     <div class="message-list">
        //         <div class="message-row">
        //             <div class="message">
        //                 <div class="user-name">
        //                     Lê Thị B
        //                 </div>
        //                 <div class="message-content">
        //                     Helloaaaaa
        //                 </div>
        //                 <div class="message-time">
        //                     11:00
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="message-row">
        //             <div class="message">
        //                 <div class="message-content">
        //                     Helloaaaaaaa
        //                 </div>
        //                 <div class="message-time">
        //                     11:00
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    }

    static async #loadConversation(messageList, mode) {

        messageList = messageList.map(item => item.message);
        if (mode === this.MODE.RELOAD) {
            //Reset message_container
            $(this.#MESSAGE_CONTAINER).html("");
        }
        //New message append to the current message container without resetting it
        await this.#renderConversation(messageList, mode);
    }

    static async #renderConversation(messageObjectList, mode) {
        if (!messageObjectList || messageObjectList.length === 0) {
            return;
        }
        let isSender = false;
        let startIndex = 0;
        let endIndex = 0;
        while (true) {
            //Handle the last message
            if (endIndex == messageObjectList.length) {
                isSender = (UserInstance.getUser().userId === messageObjectList[startIndex].senderId);
                let subMessageList = messageObjectList.slice(startIndex, endIndex);
                let messageItemContainer = await this.#renderMessageItemContainer(subMessageList, isSender);
                $(this.#MESSAGE_CONTAINER).append(messageItemContainer);
                //scroll to latest message
                //Convert jquery element to DOM element
                if (mode == this.MODE.RELOAD) {
                    this.#scrollToBottomOf($(this.#MESSAGE_CONTAINER)[0], "auto");
                } else {
                    this.#scrollToBottomOf($(this.#MESSAGE_CONTAINER)[0], "smooth");
                }
                break;
            }

            if (messageObjectList[endIndex].senderId === messageObjectList[startIndex].senderId) {
                endIndex += 1;
            } else {
                isSender = (UserInstance.getUser().userId === messageObjectList[startIndex].senderId);
                let subMessageList = messageObjectList.slice(startIndex, endIndex);
                let messageItemContainer = await this.#renderMessageItemContainer(subMessageList, isSender);
                $(this.#MESSAGE_CONTAINER).append(messageItemContainer);

                //update startIndex
                startIndex = endIndex;
            }
        }
    }

    static async #renderMessageItemContainer(messageObjectList, isSender) {
        let messageItemContainer = this.#generateElement("div", "message-item-container " + (isSender ? "sender" : "receiver"));
        let messageItem = this.#generateElement("div", "message-item");

        //get the information about the other user in the conversation
        let otherUser = this.#userMap.get(messageObjectList[0].senderId);
        if (!otherUser) {
            let user = await dataFacade.fetchUser(messageObjectList[0].senderId);

            this.#userMap.set(user.userId, user);
            otherUser = user;
        }

        //load data here
        $(messageItemContainer).append(messageItem);
        if (!isSender) {
            let userAvatar = this.#generateElement("div", "user-avatar");
            let imgAvatar = this.#generateElement("img", "avatar-icon");
            //load data 
            $(imgAvatar).attr("draggable", false);
            $(imgAvatar).attr("src", otherUser.avatarUrl);
            $(messageItem).append(userAvatar);
            $(userAvatar).append(imgAvatar);
        }

        let messageList = this.#generateElement("div", "message-list");
        $(messageItem).append(messageList);


        let messageRow = this.#renderMessageRow(messageObjectList, otherUser);
        $(messageList).append(messageRow);

        return messageItemContainer;
    }

    static #renderMessageRow(messageObjectList, user) {
        let messageRow = this.#generateElement("div", "message-row");
        for (let i = 0; i < messageObjectList.length; i++) {
            let message = this.#renderMessage(messageObjectList[i], (i == 0 ? true : false), user);
            $(messageRow).append(message);
        }
        return messageRow;
    }

    static #renderMessage(messageObject, isFirstMessage, user) {
        let _name = user.name;
        let _messageContent = messageObject.content;
        let _messageTime = this.#getShortDate(messageObject.time);

        let messageHtml;
        if (isFirstMessage) {
            messageHtml =
                `
                    <div class="user-name">
                         ${_name}
                    </div>
                    <div class="message-content">
                         ${_messageContent}
                     </div>
                     <div class="message-time">
                         ${_messageTime}
                     </div>
            `;
        } else {
            messageHtml =
                `
                    <div class="message-content">
                         ${_messageContent}
                     </div>
                     <div class="message-time">
                         ${_messageTime}
                     </div>
            `;
        }

        let message = this.#generateElement("div", "message");
        $(message).html(messageHtml);

        return message;
    }

    static #scrollToBottomOf(ele, behavior) {
        //Set time out because if don't the scrollTo didn't work
        setTimeout(() => {
            ele.scrollTo({
                top: ele.scrollHeight,
                behavior: behavior,
            });
        }, 0);
    }

    static #getShortDate(longDate) {
        const longDateObj = new Date(longDate);
        if (isNaN(longDateObj)) {
            return "Invalid Date"; // Handle invalid input
        }

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const shortDate = longDateObj.toLocaleString(undefined, options);
        return shortDate;
    }
    /**
     * This function will load the userInfo on top of the message container
     * If the array is greater than 2 meaning that the conversation is a group
     */
    static async #loadConversationUserInfo() {
        // The param could be a group or an individual user
        const USER_INFO_CONTAINER = this.#CHAT_BOX_CONTAINER.find(".user-info-container");
        const USER_INFO_AVATAR = USER_INFO_CONTAINER.find(".avatar-icon");
        const USER_INFO_NAME = USER_INFO_CONTAINER.find(".user-name-container .user-name");
        //fetch individual user data
        let otherUser;
        let userArray;
        // Load the user from the userMap in order not to send request to API
        if (this.#userMap.size >= 2) {
            userArray = Array.from(this.#userMap, (value, key) => (key, value));
            let otherUserArray = userArray.filter(user => user[0] !== UserInstance.getUser().userId);
            otherUser = otherUserArray[0][1];
        } else {
            // Change later for group conversation  getActiveConversationUserId should return an array instead of integer
            userArray = [dataFacade.getActiveConversationUserId()];
            otherUser = await dataFacade.fetchUser(userArray[0]);
        }

        //render only the first time. This is only useful if this is an individual conversation
        $(USER_INFO_AVATAR).attr("src", otherUser.avatarUrl);
        $(USER_INFO_NAME).html();
        $(USER_INFO_NAME).html(otherUser.name);

    }
    static displayUserInputNotification(senderIdList) {
        const limitedName = 3;
        let notificationMessage = this.#userMap.get(senderIdList[0]).name;

        for (let i = 1; i < senderIdList.length; i++) {
            if (i >= limitedName) {
                break;
            }
            let receiverName = this.#userMap.get(senderIdList[i]).name;
            notificationMessage += `, ${receiverName}`;
        }
        notificationMessage += " is typing ...";
        $(this.#USER_INPUT_NOTIFICATION).html(notificationMessage);
        $(this.#USER_INPUT_NOTIFICATION).show();
    }
    static hideUserInputNotification() {
        $(this.#USER_INPUT_NOTIFICATION).hide();
    }
}