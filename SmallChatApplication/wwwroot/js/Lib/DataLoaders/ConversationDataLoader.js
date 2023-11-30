import UserInstance from "../../Models/User.js";
import dataFacade from "../DataFacade/DataFacade.js";
import HTMLGenerator from "../Generators/HTMLGenerator.js";

export default class ConversationDataLoader {
    static MODE = {
        RELOAD: "Reload",
        NEW_MESSAGE: "New message"
    }
    static #CHAT_BOX_CONTAINER = $(".chat-box-container");
    static #MESSAGE_CONTAINER = this.#CHAT_BOX_CONTAINER.find(".message-container");
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
        await this.#renderConversation(messageList);
    }

    static async #renderConversation(messageObjectList) {
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
                this.#scrollToBottomOf($(this.#MESSAGE_CONTAINER)[0]);
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
            let imgAvatar = this.#generateElement("img", "avatar-image");
            //load data here
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

    static #scrollToBottomOf(ele) {
        //Set time out because if don't the scrollTo didn't work
        setTimeout(() => {
            ele.scrollTo({
                top: ele.scrollHeight,
                behavior: "smooth",
            });
        }, 100);
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
    static #loadConversationUserInfo() {
        //This shit still not work
        // The param could be a group or an individual user
        const USER_INFO_CONTAINER = this.#CHAT_BOX_CONTAINER.find(".user-info-container");
        const USER_INFO_AVATAR = USER_INFO_CONTAINER.find(".avatar-image");
        const USER_INFO_NAME = USER_INFO_CONTAINER.find(".user-name-container > p");
        //fetch individual user data
        const userArray = Array.from(this.#userMap, (value, key) => (key, value));
        const otherUserArray = userArray.filter(user => user[0] !== UserInstance.getUser().userId);
        const otherUser = otherUserArray[0][1];

        //render only the first time. This is only useful if this is an individual conversation
        $(USER_INFO_AVATAR).attr("src", otherUser.avatarUrl);
        $(USER_INFO_NAME).html(otherUser.name);

    }
}