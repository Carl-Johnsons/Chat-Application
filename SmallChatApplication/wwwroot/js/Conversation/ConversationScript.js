$(document).ready(function () {

    const CHAT_BOX_CONTAINER = $(".chat-box-container");
    const INPUT_MESSAGE_CONTAINER = CHAT_BOX_CONTAINER.find(".input-message-container");
    $(INPUT_MESSAGE_CONTAINER).hide();
    console.log("Input message hide");

    AddSendMessageEvent();

    function AddSendMessageEvent() {

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
                    //individual message json format
                    //{
                    //    "messageId": 43,
                    //    "userReceiverId": 1,
                    //    "status": "string",
                    //    "message": {
                    //        "messageId": 43,
                    //        "senderId": 2,
                    //        "content": "string",
                    //        "time": "2023-10-31T01:26:30.939Z",
                    //        "messageType": "string",
                    //        "messageFormat": "string",
                    //        "active": true,
                    //        "sender": null
                    //    },
                    //    "userReceiver": null
                    //}


                    _CONNECTION.invoke("SendIndividualMessage", data).catch(function (err) {
                        console.error("error when SendIndividualMessage: " + err.toString());
                    });
                    ChatApplicationNamespace.LoadNewMessage(data);
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }
    };
});
