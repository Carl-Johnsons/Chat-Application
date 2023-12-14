import UserInstance from "../../Models/User.js";
import dataFacade from "../DataFacade/DataFacade.js";
import HTMLGenerator from "../Generators/HTMLGenerator.js";

export default class ContactListDataLoader {
    constructor() {

    }

    static loadFriendListData(friendObjectList) {
        let generateElement = HTMLGenerator.generateElement;
        //define local
        const CONTACT_PAGE_CONTAINER = $(".contact-page-container");
        const FRIEND_CONTACT_LIST_CONTAINER = CONTACT_PAGE_CONTAINER.find(".friend-list-container .contact-list-container");
        $(FRIEND_CONTACT_LIST_CONTAINER).html('');


        renderFriend(friendObjectList);
        function renderFriend(friendObjectList) {
            //Clear html of this container first
            $(FRIEND_CONTACT_LIST_CONTAINER).html('');

            //   <div class="contact-list-container">
            //     <div class="contact-row">
            //         <div class="contact-info-container">
            //             <div class="avatar-container">
            //                 <img draggable="false" class="avatar-image" src="/img/user.png" />
            //             </div>
            //             <div class="user-name">
            //                 <p>Lol</p>
            //             </div>
            //         </div>
            //         <div class="btn-container">
            //             <button class="btn btn-detail">...</button>
            //             <button class="btn btn-delete-friend">X</button>
            //         </div>
            //     </div>
            // </div>


            for (let friendObject of friendObjectList) {
                let contactRow = generateElement("div", "contact-row");
                $(contactRow).attr("data-id", friendObject.userId);
                $(FRIEND_CONTACT_LIST_CONTAINER).append($(contactRow));

                let contactInfoContainer = generateElement("div", "contact-info-container");
                let btnContainer = generateElement("div", "btn-container");
                $(contactRow).append(contactInfoContainer);
                $(contactRow).append(btnContainer);

                //contact info container
                let avatarContainer = generateElement("div", "avatar-container");
                let avatarImg = generateElement("img", "avatar-image");
                $(avatarImg).attr('draggable', false);
                $(avatarImg).attr('src', friendObject.avatarUrl);
                $(avatarContainer).append(avatarImg);

                //username
                let userName = generateElement("div", "user-name");
                let name = generateElement("p", "");
                $(name).text(friendObject.name);
                $(userName).append(name);

                $(contactInfoContainer).append(avatarContainer);
                $(contactInfoContainer).append(userName);

                //btn container
                let btnDetail = generateElement("button", "btn btn-detail");
                $(btnDetail).text("...");

                //Send request to get friend detail
                $(btnDetail).click(async function () {
                    await dataFacade.loadFriendDataToInfoPopup(friendObject.userId);
                    const INFO_POP_UP = $(".info-pop-up-container");
                    $(INFO_POP_UP).show();
                });

                let btnDeleteFriend = generateElement("button", "btn btn-delete-friend");
                $(btnDeleteFriend).text("X");
                //Send request to remove Friend
                $(btnDeleteFriend).click(async function () {
                    await dataFacade.fetchDeleteFriend(UserInstance.getUser().userId, friendObject.userId);
                    //Updating the friend list
                    await dataFacade.loadFriendList();
                });
                $(btnContainer).append(btnDetail);
                $(btnContainer).append(btnDeleteFriend);
            }
        }
    }
    static loadFriendRequestListData(friendRequestObjectList) {
        let generateElement = HTMLGenerator.generateElement;

        const CONTACT_PAGE_CONTAINER = $(".contact-page-container");
        const FRIEND_REQUEST_CONTACT_LIST_CONTAINER = CONTACT_PAGE_CONTAINER.find(".friend-request-list-container .contact-list-container");

        $(FRIEND_REQUEST_CONTACT_LIST_CONTAINER).html('');
        //Friend request json format
        //[
        //    {
        //        "senderId": 4,
        //        "receiverId": 3,
        //        "content": "string",
        //        "date": "2023-10-20T10:30:10.273",
        //        "status": "Pending",
        //        "receiver": null,
        //        "sender": {
        //            "userId": 4,
        //            "phoneNumber": "",
        //            "password": "",
        //            "name": "",
        //            "dob": "",
        //            "gender": "Nam",
        //            "avatarUrl": "",
        //            "backgroundUrl": "",
        //            "introduction": "",
        //            "email": "",
        //            "active": true,
        //            "groupGroupDeputies": [],
        //            "groupGroupLeaders": [],
        //            "messages": []
        //        }
        //    }
        //]
        for (let friendRequestObject of friendRequestObjectList) {
            renderFriendRequest(friendRequestObject);
        }
        console.log("Done loading friend request");

        function renderFriendRequest(friendRequestObject) {
            // <div class="contact-list-container">
            //     <div class="contact-row">
            //         <div class="contact-info-container">
            //             <div class="avatar-container">
            //                 <img draggable="false" class="avatar-image" src="/img/user.png" />
            //             </div>
            //             <div class="user-name">
            //                 <p>Lol</p>
            //             </div>
            //         </div>
            //         <div class="btn-container">
            //             <button class="btn btn-accept">Accept</button>
            //             <button class="btn btn-detail">...</button>
            //             <button class="btn btn-delete-friend">X</button>
            //         </div>
            //     </div>
            // </div>

            let contactRow = generateElement("div", "contact-row");
            $(FRIEND_REQUEST_CONTACT_LIST_CONTAINER).append($(contactRow));

            let contactInfoContainer = generateElement("div", "contact-info-container");
            let btnContainer = generateElement("div", "btn-container");
            $(contactRow).append(contactInfoContainer);
            $(contactRow).append(btnContainer);

            //contact info container
            let avatarContainer = generateElement("div", "avatar-container");
            let avatarImg = generateElement("img", "avatar-image");
            $(avatarImg).attr('draggable', false);
            $(avatarImg).attr('src', friendRequestObject.avatarUrl);
            $(avatarContainer).append(avatarImg);

            //username
            let userName = generateElement("div", "user-name");
            let name = generateElement("p", "");
            $(name).text(friendRequestObject.name);
            $(userName).append(name);

            $(contactInfoContainer).append(avatarContainer);
            $(contactInfoContainer).append(userName);

            //btn container
            let btnAccept = generateElement("button", "btn btn-accept");
            $(btnAccept).text("Accept");
            $(btnAccept).click(async function () {
                //The other user is the sender while the current user is the receiver 
                await dataFacade.fetchAddFriend(friendRequestObject.userId, UserInstance.getUser().userId);
                //Updating friend request list and friend list
                await dataFacade.loadFriendList();
                await dataFacade.loadFriendRequestList();
              
            });
            let btnDetail = generateElement("button", "btn btn-detail");
            $(btnDetail).text("...");

            $(btnDetail).click(async function () {
                await dataFacade.loadFriendDataToInfoPopup(friendRequestObject.userId);
                const INFO_POP_UP = $(".info-pop-up-container");
                $(INFO_POP_UP).show();
            });

            let btnDeleteFriendRequest = generateElement("button", "btn btn-delete-friend");

            $(btnDeleteFriendRequest).text("X");
            $(btnDeleteFriendRequest).click(async function () {
                //The other user is the sender while the current user is the receiver 
                await dataFacade.fetchDeleteFriendRequest(friendRequestObject.userId, UserInstance.getUser().userId);
                //Updating friend request list
                await dataFacade.loadFriendRequestList();
            });

            $(btnContainer).append(btnAccept);
            $(btnContainer).append(btnDetail);
            $(btnContainer).append(btnDeleteFriendRequest);
        }
    }
}