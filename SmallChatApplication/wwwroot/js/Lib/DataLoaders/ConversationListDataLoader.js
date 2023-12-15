import UserInstance from "../../Models/User.js";
import dataFacade from "../DataFacade/DataFacade.js";

export default class ConversationListDataLoader {
    constructor() {

    }
    static loadConversationList(friendList) {
        const CONVERSATION_LIST_CONTAINER = $(".conversations-list-container");
        $(CONVERSATION_LIST_CONTAINER).html("");
        let currentUserId = UserInstance.getUser().userId;

        //friend array json format
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


        let fetchAndRenderFriendList = async () => {
            let lastMessage;
            for (let friend of friendList) {
                lastMessage = await dataFacade.fetchLastIndividualMessage(currentUserId, friend.userId);
                renderIndividualConversation(friend, lastMessage);
            }
            //Add event click listener after generating html
            this.#AddClickEvent();
        }

        fetchAndRenderFriendList();

        function renderIndividualConversation(friend, lastMessage) {

            //Struture of a conversation

            //<div class="conversation active d-flex">
            //    <div class="conversation-avatar">
            //        <img draggable="false" src="~/img/user.png" />
            //    </div>
            //    <div class="conversation-description">
            //        <div class="conversation-name text-truncate">
            //            Group 2
            //        </div>
            //        <div class="conversation-last-message text-truncate">
            //            You: Hello world lllllldasfasgjhasjgkhsagjsllllllllllll
            //        </div>
            //    </div>
            //</div>

            let conversationDiv = document.createElement("div");
            conversationDiv.className = "conversation d-flex";
            //This attribute let the request know who the friend is
            $(conversationDiv).attr("data-user-id", friend.userId);
            CONVERSATION_LIST_CONTAINER.append(conversationDiv);

            // Creating avatar
            let conversationAvatarDiv = document.createElement("div");
            conversationAvatarDiv.className = "conversation-avatar";
            let avatarImage = document.createElement("img");
            avatarImage.src = friend.avatarUrl;
            conversationAvatarDiv.append(avatarImage);

            //Create description
            let conversationDescriptionDiv = document.createElement("div");
            conversationDescriptionDiv.className = "conversation-description ";

            let conversationNameDiv = document.createElement("div");
            conversationNameDiv.className = "conversation-name text-truncate";
            conversationNameDiv.textContent = friend.name;

            //Create last message
            let converstationLastMessageDiv = document.createElement("div");
            converstationLastMessageDiv.className = "conversation-last-message text-truncate";
            if (lastMessage) {
                let sender = (lastMessage.message.senderId == currentUserId ? "You:" : "")
                converstationLastMessageDiv.textContent = `${sender} ${lastMessage.message.content}`;
            } else {
                converstationLastMessageDiv.textContent = `Hãy bắt đầu cuộc trò chuyện mới với ${friend.name}`;
            }

            conversationDescriptionDiv.append(conversationNameDiv);
            conversationDescriptionDiv.append(converstationLastMessageDiv);

            conversationDiv.append(conversationAvatarDiv);
            conversationDiv.append(conversationDescriptionDiv);
        }
    }

    static updateLastMessage(friendId, lastMessage) {
        if (!lastMessage) {
            console.log("No new message");
            return;
        }
        const CONVERSATION_LIST_CONTAINER = $(".conversations-list-container");
        const CONVERSATION = CONVERSATION_LIST_CONTAINER.find(`.conversation[data-user-id=${friendId}]`);
        const LAST_MESSAGE_CONTAINER = CONVERSATION.find(".conversation-last-message");
        let currentUserId = UserInstance.getUser().userId;
        let sender = (lastMessage.message.senderId == currentUserId ? "You:" : "")
        $(LAST_MESSAGE_CONTAINER).text(`${sender} ${lastMessage.message.content}`);
    }
    static #AddClickEvent() {
        console.log("add click event for friend list");
        const CONVERSATION_LIST_CONTAINER = $(".conversations-list-container");

        let conversations = CONVERSATION_LIST_CONTAINER.find(".conversation");
        const LEFT_SECTION = $(".left");
        const LEFT_LIST_SECTION = LEFT_SECTION.find(".list-section");
        const RIGHT_SECTION = $(".right");
        //responsive event min-width 768px

        let widthMatch = window.matchMedia("(min-width: 768px)");
        if (widthMatch.matches) {
            normalClickEvent();
        } else {
            phoneClickEvent();
        }
        //Detect width change
        widthMatch.addEventListener('change', function () {
            if (widthMatch.matches) {
                normalClickEvent();
            } else {
                phoneClickEvent();
            }
        });
        function normalClickEvent() {
            conversations.each(function () {
                $(this).off('click').click(async function () {
                    disableAllConversations();
                    activateConversation($(this));
                    //Load the messageList into active conversation
                    dataFacade.loadConversation(undefined, "Reload");
                });
            });
        }
        function phoneClickEvent() {

            conversations.each(function () {
                $(this).off('click').click(function () {
                    // reset 2 section left and right when click
                    disableAllConversations();
                    activateConversation($(this));
                    // The left list section should display none to save space for the right section
                    if (!$(LEFT_LIST_SECTION).hasClass("d-none")) {
                        $(LEFT_SECTION).addClass("left-mobile");
                        $(LEFT_LIST_SECTION).addClass("d-none");
                    }
                    if ($(RIGHT_SECTION).hasClass("d-md-block")
                        && $(RIGHT_SECTION).hasClass("d-none")) {
                        $(RIGHT_SECTION).removeClass("d-none");
                        $(RIGHT_SECTION).removeClass("d-md-block");
                    }
                    //Load the messageList into active conversation
                    dataFacade.loadConversation(undefined, "Reload");
                });
            });
        }

        function disableAllConversations() {
            conversations.each(function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                }
            })
        }
        function activateConversation(conversationDiv) {
            conversationDiv.addClass("active");
        }
    }
}