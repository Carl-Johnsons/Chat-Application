
import dataFacade from "../Lib/DataFacade/DataFacade.js";
import connectionInstance from "../Models/ChatHub.js";
import UserInstance from "../Models/User.js";

$(document).ready(function () {

    const CHAT_BOX_CONTAINER = $(".chat-box-container");
    const CONVERSATION_CONTAINER = $(CHAT_BOX_CONTAINER).find(".conversation-container");
    const USER_INPUT_NOTIFICATION = $(CONVERSATION_CONTAINER).find(".user-input-notification");
    const INPUT_MESSAGE_CONTAINER = $(CHAT_BOX_CONTAINER).find(".input-message-container");
    const INPUT_MESSAGE = $(INPUT_MESSAGE_CONTAINER).find(".input-message");

    $(USER_INPUT_NOTIFICATION).hide();
    $(INPUT_MESSAGE_CONTAINER).hide();

    AddSendMessageEvent();
    AddInputNotificationEvent();
    function AddSendMessageEvent() {

        const btnSendMessage = CHAT_BOX_CONTAINER.find("button.btn-send-message");
        const inputSendMessage = CHAT_BOX_CONTAINER.find("input.input-message");

        btnSendMessage.click(async function () {
            let messageValue = inputSendMessage.val();
            let otherUserId = $(".conversations-list-container  div.conversation.d-flex.active").attr("data-user-id");
            if (messageValue === null || messageValue.length === 0) {
                return;
            }
            //send the message
            await dataFacade.sendMessage(UserInstance.getUser().userId, otherUserId, messageValue);
            dataFacade.updateLastMessage(otherUserId);

        });
    };

    function AddInputNotificationEvent() {
        let timeout = null;

        $(INPUT_MESSAGE).on('input', function () {
            // Clear the existing timeout
            if (timeout) {
                clearTimeout(timeout);
                connectionInstance
            } else {
                let model = connectionInstance.senderReceiverListModel;
                // for some reason the senderId is a string
                model.senderIdList = [UserInstance.getUser().userId];
                model.receiverIdList = [dataFacade.getActiveConversationUserId()];

                console.log({model});
                connectionInstance.notifyAction(connectionInstance.actionType.NotifyUserTyping, model);
            }
            // Set a new timeout for 2000 milliseconds (2 seconds)
            timeout = setTimeout(function () {
                timeout = null;

                let model = connectionInstance.senderReceiverListModel;
                // for some reason the senderId is a string
                model.senderIdList = [UserInstance.getUser().userId];
                model.receiverIdList = [dataFacade.getActiveConversationUserId()];
                console.log({ model });
                connectionInstance.notifyAction(connectionInstance.actionType.DisableNotifyUserTyping, model);
            }, 2000);
        });
    }
});
