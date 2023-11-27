const { default: APIConsumer } = require("../Lib/APIConsumers/APIConsumers");


ConversationNamespace.LoadConversation = function (messageList, mode) {
    const CHAT_BOX_CONTAINER = $(".chat-box-container");
    const MESSAGE_CONTAINER = CHAT_BOX_CONTAINER.find(".message-container");

    // Show the "send message" button even the message array is zero
    const INPUT_MESSAGE_CONTAINER = CHAT_BOX_CONTAINER.find(".input-message-container");
    $(INPUT_MESSAGE_CONTAINER).show();

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

    loadConversation(messageList, mode);

    function loadConversation(messageList, mode) {
        if (mode === "RELOAD") {
            messageList = messageList.map(item => item.message);


            //Reset message_container
            $(MESSAGE_CONTAINER).html("");


            renderConversation(messageList);
            return;
        }
        if (mode === "NEW MESSAGE") {
            messageList = messageList.map(item => item.message);
            renderConversation(messageList);
            return;
        }
    }


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

    function scrollToElement(ele) {
        const element = $(ele).get(0); // Get the DOM element

        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth'
        });
    }
    async function renderConversation(messageObjectList) {


        if (!messageObjectList || messageObjectList.length === 0) {
            return;
        }

        console.log("renderConversation: messageObjectList " + messageObjectList.length);

        let isSender = false;

        let startIndex = 0;
        let endIndex = 0;

        while (true) {
            //Handle the last message
            if (endIndex == messageObjectList.length) {
                isSender = (_USER.userId === messageObjectList[startIndex].senderId);
                let subMessageList = messageObjectList.slice(startIndex, endIndex);
                let messageItemContainer = await renderMessageItemContainer(subMessageList, isSender);
                $(MESSAGE_CONTAINER).append(messageItemContainer);
                //scroll to latest message
                scrollToElement(MESSAGE_CONTAINER);

                break;
            }

            if (messageObjectList[endIndex].senderId === messageObjectList[startIndex].senderId) {
                endIndex += 1;
            } else {
                isSender = (_USER.userId === messageObjectList[startIndex].senderId);
                let subMessageList = messageObjectList.slice(startIndex, endIndex);
                let messageItemContainer = await renderMessageItemContainer(subMessageList, isSender);
                $(MESSAGE_CONTAINER).append(messageItemContainer);

                //update startIndex
                startIndex = endIndex;
            }
        }
    }
    async function renderMessageItemContainer(messageObjectList, isSender) {
        console.log("renderMessageItemContainer: " + messageObjectList.length);
        let messageItemContainer = generateElement("div", "message-item-container " + (isSender ? "sender" : "receiver"));
        let messageItem = generateElement("div", "message-item");

        //get the information about this user
        let user = await APIConsumer.getUser(messageObjectList[0].senderId);
        $(messageItemContainer).append(messageItem);
        if (!isSender) {
            let userAvatar = generateElement("div", "user-avatar");
            let imgAvatar = generateElement("img", "avatar-image");
            //load data here
            console.log({ user });
            $(imgAvatar).attr("src", user.avatarUrl);


            $(messageItem).append(userAvatar);
            $(userAvatar).append(imgAvatar);
        }


        let messageList = generateElement("div", "message-list");
        $(messageItem).append(messageList);


        let messageRow = renderMessageRow(messageObjectList, user);
        $(messageList).append(messageRow);

        return messageItemContainer;
    }
    function renderMessageRow(messageObjectList, user) {
        console.log("renderMessageRow");
        let messageRow = generateElement("div", "message-row");
        for (let i = 0; i < messageObjectList.length; i++) {
            let message = renderMessage(messageObjectList[i], (i == 0 ? true : false), user);
            $(messageRow).append(message);
        }
        return messageRow;
    }
    function renderMessage(messageObject, isFirstMessage, user) {
        console.log("renderMessage");
        let _name = user.name;
        let _messageContent = messageObject.content;
        let _messageTime = getShortDate(messageObject.time);

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

        let message = generateElement("div", "message");
        $(message).html(messageHtml);

        return message;
    }
    function generateElement(eleName, className) {
        let element = document.createElement(eleName);
        element.className = className;
        return element;
    }
    function getShortDate(longDate) {
        const longDateObj = new Date(longDate);
        if (isNaN(longDateObj)) {
            return "Invalid Date"; // Handle invalid input
        }

        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const shortDate = longDateObj.toLocaleString(undefined, options);
        return shortDate;
    }
}
ConversationNamespace.LoadConversationUserInfo = async function (userArrayId) {
    // The param could be a group or an individual user
    const CHAT_BOX_CONTAINER = $(".chat-box-container");
    const USER_INFO_CONTAINER = CHAT_BOX_CONTAINER.find(".user-info-container");
    const USER_INFO_AVATAR = USER_INFO_CONTAINER.find(".avatar-image");
    const USER_INFO_NAME = USER_INFO_CONTAINER.find(".user-name-container > p");
    //fetch individual user data
    let user = await APIConsumer.getUser(userArrayId[0]);
    //render only the first time. This is only useful if this is an individual conversation
    $(USER_INFO_AVATAR).attr("src", user.avatarUrl);
    $(USER_INFO_NAME).html(user.name);
}

