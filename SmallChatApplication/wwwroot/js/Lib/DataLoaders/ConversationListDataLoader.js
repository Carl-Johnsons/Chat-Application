import dataFacade from "../DataFacade/DataFacade.js";

export default class ConversationListDataLoader {
    constructor() {

    }
    static loadConversationList(friendList) {
        const CONVERSATION_LIST_CONTAINER = $(".conversations-list-container");
        $(CONVERSATION_LIST_CONTAINER).html("");


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
        for (let friend of friendList) {
            renderIndividualConversation(friend);
        }

        function renderIndividualConversation(friend, message) {

            //Struture of a conversation

            // <div class="conversations-list-container ">
            //     <div data-user-id= "1" class="conversation active d-flex">
            //         <div class="conversation-avatar">
            //             <img src="~/img/user.png" />
            //         </div>
            //         <div class="conversation-description">
            //             <div class="conversation-name">
            //                 Group 2
            //             </div>
            //             <div class="conversation-last-message">
            //                 You: Hello world lllllldasfasgjhasjgkhsagjsllllllllllll
            //             </div>
            //         </div>
            //     </div>
            // </div>

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
            conversationDescriptionDiv.className = "conversation-description";

            let conversationNameDiv = document.createElement("div");
            conversationNameDiv.className = "conversation-name";
            conversationNameDiv.textContent = friend.name;

            //Create last message
            let converstationLastMessageDiv = document.createElement("div");
            converstationLastMessageDiv.className = "conversation-last-message";
            if (message) {
                converstationLastMessageDiv.textContent = `You: ${message.content}`;
            }

            conversationDescriptionDiv.append(conversationNameDiv);
            conversationDescriptionDiv.append(converstationLastMessageDiv);

            conversationDiv.append(conversationAvatarDiv);
            conversationDiv.append(conversationDescriptionDiv);
        }

        //Add event click listener after generating html
        this.#AddClickEvent();
    }
    static #AddClickEvent() {
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
                    console.log(this);
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
                    dataFacade.loadConversation();
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