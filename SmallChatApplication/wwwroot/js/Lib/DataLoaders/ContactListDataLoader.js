import APIConsumer from "../APIConsumers/APIConsumers.js";
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
            //                 <img class="avatar-image" src="/img/user.png" />
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
                    try {
                        let userData = await APIConsumer.getUser(friendObject.userId);
                        //refactor later
                        ChatApplicationNamespace.LoadInfoPopupData(userData, "Friend");
                        const INFO_POP_UP = $(".info-pop-up-container");
                        $(INFO_POP_UP).show();
                    } catch (err) {
                        console.error(err);
                    }
                });

                let btnDeleteFriendRequest = generateElement("button", "btn btn-delete-friend");
                $(btnDeleteFriendRequest).text("X");
                //Send request to remove Friend
                $(btnDeleteFriendRequest).click(async function () {
                    try {
                        let xhr = await APIConsumer.deleteFriend(_USER.userId, friendObject.userId);
                        if (xhr.status >= 200 && xhr.status <= 299) {
                            console.log("Delete friend: " + friendObject.userName + " successufully!");
                        } else {
                            throw new Error("Something is wrong");
                        }
                    } catch (err) {
                        console.error(err);
                    }
                });
                $(btnContainer).append(btnDetail);
                $(btnContainer).append(btnDeleteFriendRequest);
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
            console.log("\nDone loading friend request\n");
            renderFriendRequest(friendRequestObject);
        }

        function renderFriendRequest(friendRequestObject) {
            // <div class="contact-list-container">
            //     <div class="contact-row">
            //         <div class="contact-info-container">
            //             <div class="avatar-container">
            //                 <img class="avatar-image" src="/img/user.png" />
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
                try {
                    let xhr = await APIConsumer.addFriend(friendRequestObject.userId);
                    if (xhr.status >= 200 && xhr.status <= 299) {
                        console.log("add friend successfully");
                    } else {
                        throw new Error("add friend failed");
                    }
                } catch (err) {
                    console.error(err);
                }
            });
            let btnDetail = generateElement("button", "btn btn-detail");
            $(btnDetail).text("...");
            let btnDeleteFriendRequest = generateElement("button", "btn btn-delete-friend");

            $(btnDeleteFriendRequest).text("X");
            $(btnDeleteFriendRequest).click(async function () {
                try {
                    let xhr = await APIConsumer.deleteFriendRequest(friendRequestObject.userId);
                    if (xhr.status >= 200 && xhr.status <= 299) {
                        console.log("delete friend request successfully");
                    } else {
                        throw new Error("delete friend request failed");
                    }
                } catch (err) {
                    console.error(err);
                }

                sendDeleteFriendRequest(friendRequestObject.userId);
            });

            $(btnContainer).append(btnAccept);
            $(btnContainer).append(btnDetail);
            $(btnContainer).append(btnDeleteFriendRequest);
        }
    }
}