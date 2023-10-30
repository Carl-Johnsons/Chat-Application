var ConservationListNamespace = ConservationListNamespace || {};

ConservationListNamespace.LoadConversationList = function (friendList) {

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
    ConservationListNamespace.AddClickEvent();
}


ConservationListNamespace.AddClickEvent = function () {
    const CONVERSATION_LIST_CONTAINER = $(".conversations-list-container");

    let conversations = CONVERSATION_LIST_CONTAINER.find(".conversation");
    conversations.each(function () {
        $(this).click(function () {
            disableAllConversations();
            activateConversation($(this));
            console.log(this);
            ChatApplicationNamespace.GetMessageList($(this).attr("data-user-id"));

        });
    });

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
