import dataFacade from "../Lib/DataFacade/DataFacade.js";
import UserInstance from "../Models/User.js";

$(document).ready(function () {

    const CHAT_BOX_CONTAINER = $(".chat-box-container");
    const INPUT_MESSAGE_CONTAINER = CHAT_BOX_CONTAINER.find(".input-message-container");
    $(INPUT_MESSAGE_CONTAINER).hide();

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

            //send the message
            dataFacade.sendMessage(UserInstance.getUser().userId, otherUserId, messageValue);
        });
    };
});
