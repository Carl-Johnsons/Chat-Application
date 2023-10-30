var ConversationNamespace = ConversationNamespace || {};





ConversationNamespace.LoadConversation = function (messageList) {
    const CHAT_BOX_CONTAINER = $(".chat-box-container");
    const USER_INFO_CONTAINER = CHAT_BOX_CONTAINER.find(".user-info-container");
    const user_info_avatar = USER_INFO_CONTAINER.find(".avatar-image");
    const user_info_name = USER_INFO_CONTAINER.find(".user-name-container > p");
    //reset avatar and name
    $(user_info_avatar).attr("src", "");
    $(user_info_name).html("");


    const MESSAGE_CONTAINER = CHAT_BOX_CONTAINER.find(".message-container");

    //Reset message_container
    $(MESSAGE_CONTAINER).html("");





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

    messageList = messageList.map(item => item.message);
    renderConversation(messageList);



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
        let user = await ChatApplicationNamespace.GetUser(messageObjectList[0].senderId);
        $(messageItemContainer).append(messageItem);
        if (!isSender) {
            let userAvatar = generateElement("div", "user-avatar");
            let imgAvatar = generateElement("img", "avatar-image");
            //load data here
            console.log({ user });
            $(imgAvatar).attr("src", user.avatarUrl);

            //render only the first time. This is only useful if this is an individual conversation
            if ($(user_info_avatar).attr("src") === "" && $(user_info_name).html() === "") {
                $(user_info_avatar).attr("src", user.avatarUrl);
                $(user_info_name).html(user.name);
            }

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
        let message = generateElement("div", "message");
        // Only first message has name
        if (isFirstMessage) {
            let userName = generateElement("div", "user-name");
            //change senderId to name later
            $(userName).text(user.name);
            $(message).append(userName);
        }

        let messageContent = generateElement("div", "message-content");
        $(messageContent).text(messageObject.content);
        let messageTime = generateElement("div", "message-time");
        // make the date custom
        $(messageTime).text(getShortDate(messageObject.time));

        $(message).append(messageContent);
        $(message).append(messageTime);
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



$(document).ready(function () {
    AddSendMessageEvent();

    function AddSendMessageEvent() {
        const CHAT_BOX_CONTAINER = $(".chat-box-container");

        const btnSendMessage = CHAT_BOX_CONTAINER.find("button.btn-send-message");
        const inputSendMessage = CHAT_BOX_CONTAINER.find("input.input-message");

        btnSendMessage.click(function () {
            let messageValue = inputSendMessage.val();
            let otherUserId = $(".conversations-list-container  div.conversation.d-flex.active").attr("data-user-id");


            if (messageValue === null || messageValue.length === 0) {
                return;
            }
            sendMessage(otherUserId, messageValue);
        });
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

        function sendMessage(userReceiverId, messageContent) {
            //individual message object
            let messageObject = {
                userReceiverId: userReceiverId,
                status: "string",
                message: {
                    senderId: _USER.userId,
                    content: messageContent,
                    time: getCurrentDateTimeInISO8601(),
                    messageType: "Individual",
                    messageFormat: "Text",
                    active: true
                }
            };
            console.log(JSON.stringify(messageObject));

            $.ajax({
                url: _BASE_ADDRESS + "/api/Messages/SendIndividualMessage",
                dataType: 'json',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(messageObject),
                success: function (data, textStatus, jQxhr) {
                    console.log("send message successfully");

                    _CONNECTION.invoke("SendIndividualMessage", _USER.userId, parseInt(userReceiverId)).catch(function (err) {
                        console.error("error when SendIndividualMessage: " + err.toString());
                    });
                    ChatApplicationNamespace.GetMessageList(userReceiverId);
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    };
})
