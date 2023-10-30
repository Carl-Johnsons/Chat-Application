var ConservationListNamespace = ConservationListNamespace || {};

const CONVERSATION_LIST_CONTAINER = $(".conversations-list-container");

let user = {
    id: 1,
    name: "Đứca",
    gender: "Nam",
    DoB: "10-02-2003",
    phoneNumber: "+84123",
    backgroundImgURL: "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1666008987698.jpg",
    avatarURL: "https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg",
};

let group = {
    id: 1,
    name: 'Bàn chuyện linh tinh',
    leaderId: 1,
    deputyId: 1,
    avatarUrl: "https://xwatch.vn/upload_images/images/2023/05/22/anh-meme-la-gi.jpg",
    inviteUrl: ""
};
let message = {
    id: 1,
    senderId: 1,
    content: "Ê đi chơi ko ae ? Hẹn tối nay 7h hé!",
    messageType: "text",
    active: true
}

let group2 = {
    id: 2,
    name: 'Công việc',
    leaderId: 2,
    deputyId: 2,
    avatarUrl: "https://info.totalwellnesshealth.com/hs-fs/hubfs/Relax-2.png",
    inviteUrl: ""
};

let message2 = {
    id: 2,
    senderId: 1,
    content: "Cuộc họp này rất quan trọng!",
    messageType: "text",
    active: true
}
CONVERSATION_LIST_CONTAINER.LoadConversationList = function (friendObjectList) {


    //FriendList json format
    // [
    //     {
    //         "userId": 1,
    //         "friendId": 3,
    //         "friendNavigation": {
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
    //         },
    //         "user": null
    //     }
    // ]
    for (let friendObject of friendObjectList) {
        renderIndividualConversation(friendObject.friendNavigation);
    }

    function renderIndividualConversation(friendObject, messageObject) {
        //Struture of a conversation

        // <div class="conversations-list-container ">
        //     <div class="conversation active d-flex">
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
        CONVERSATION_LIST_CONTAINER.append(conversationDiv);

        // Creating avatar
        let conversationAvatarDiv = document.createElement("div");
        conversationAvatarDiv.className = "conversation-avatar";
        let avatarImage = document.createElement("img");
        avatarImage.src = friendObject.avatarUrl;
        conversationAvatarDiv.append(avatarImage);

        //Create description
        let conversationDescriptionDiv = document.createElement("div");
        conversationDescriptionDiv.className = "conversation-description";

        let conversationNameDiv = document.createElement("div");
        conversationNameDiv.className = "conversation-name";
        conversationNameDiv.textContent = friendObject.name;

        //Create last message
        let converstationLastMessageDiv = document.createElement("div");
        converstationLastMessageDiv.className = "conversation-last-message";
        if (message) {
            converstationLastMessageDiv.textContent = `You: ${messageObject.content}`;
        }

        conversationDescriptionDiv.append(conversationNameDiv);
        conversationDescriptionDiv.append(converstationLastMessageDiv);

        conversationDiv.append(conversationAvatarDiv);
        conversationDiv.append(conversationDescriptionDiv);
    }


    //renderConversation(group, user, message);
    //renderConversation(group2, user, message2);

    function renderConversation(groupObject, messageObject) {
        //Struture of a conversation

        // <div class="conversations-list-container ">
        //     <div class="conversation active d-flex">
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
        CONVERSATION_LIST_CONTAINER.append(conversationDiv);

        // Creating avatar
        let conversationAvatarDiv = document.createElement("div");
        conversationAvatarDiv.className = "conversation-avatar";
        let avatarImage = document.createElement("img");
        avatarImage.src = groupObject.avatarUrl;
        conversationAvatarDiv.append(avatarImage);

        //Create description
        let conversationDescriptionDiv = document.createElement("div");
        conversationDescriptionDiv.className = "conversation-description";

        let conversationNameDiv = document.createElement("div");
        conversationNameDiv.className = "conversation-name";
        conversationNameDiv.textContent = groupObject.name;

        //Create last message
        let converstationLastMessageDiv = document.createElement("div");
        converstationLastMessageDiv.className = "conversation-last-message";
        converstationLastMessageDiv.textContent = `You: ${messageObject.content}`;

        conversationDescriptionDiv.append(conversationNameDiv);
        conversationDescriptionDiv.append(converstationLastMessageDiv);

        conversationDiv.append(conversationAvatarDiv);
        conversationDiv.append(conversationDescriptionDiv);
    }
}
