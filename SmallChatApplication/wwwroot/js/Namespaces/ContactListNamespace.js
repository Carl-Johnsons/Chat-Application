

ContactListNamespace.LoadFriendList = function (friendObjectList) {
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
            $(btnDetail).click(function () {
                $.ajax({
                    url: _BASE_ADDRESS + "/api/Users/" + friendObject.userId,
                    dataType: "json",
                    method: 'GET',
                    contentType: "application/json",
                    success: function (data, textStatus, jQxhr) {
                        ChatApplicationNamespace.LoadInfoPopupData(data, "Friend");
                        const INFO_POP_UP = $(".info-pop-up-container");
                        $(INFO_POP_UP).show();
                    },
                    error: function (jQxhr, textStatus, errorThrown) {
                        console.log("Get friend detail error: " + errorThrown);
                    }
                })
            });

            let btnDeleteFriend = generateElement("button", "btn btn-delete-friend");
            $(btnDeleteFriend).text("X");
            //Send request to remove Friend
            $(btnDeleteFriend).click(function () {
                $.ajax({
                    //_USER is global attribute, it's declare in layout.cshtml
                    url: _BASE_ADDRESS + "/api/Users/RemoveFriend/" + _USER.userId + "/" + friendObject.userId,
                    dataType: "json",
                    method: "DELETE",
                    contentType: "application/json",
                    success: function (data, textStatus, jQxhr) {
                        //Notify other user
                        _CONNECTION.invoke("DeleteFriend", friendObject.userId).catch(function (err) {
                            console.log("Error when notify deleting friend");
                        });

                        //Updating friend list
                        ChatApplicationNamespace.GetFriendList();
                    },
                    error: function (jQxhr, textStatus, errorThrown) {
                        console.log("Delete friend error: " + errorThrown);
                    }
                });
            });
            $(btnContainer).append(btnDetail);
            $(btnContainer).append(btnDeleteFriend);
        }
    }
}
ContactListNamespace.LoadFriendRequestList = function (friendRequestObjectList) {
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
        $(btnAccept).click(function () {
            sendAddFriend(friendRequestObject.userId);
        });
        let btnDetail = generateElement("button", "btn btn-detail");
        $(btnDetail).text("...");
        let btnDeleteFriend = generateElement("button", "btn btn-delete-friend");

        $(btnDeleteFriend).text("X");
        $(btnDeleteFriend).click(function () {
            sendDeleteFriendRequest(friendRequestObject.userId);
        });


        $(btnContainer).append(btnAccept);
        $(btnContainer).append(btnDetail);
        $(btnContainer).append(btnDeleteFriend);
        console.log(FRIEND_REQUEST_CONTACT_LIST_CONTAINER);
        console.log(contactRow);
    }
    function sendAddFriend(senderId) {
        $.ajax({
            //_USER is global attribute, it's declare in layout.cshtml
            // Sender is the one who send the request not the current user
            // The current user is the one who accept the friend request
            url: _BASE_ADDRESS + "/api/Users/AddFriend/" + senderId + "/" + _USER.userId,
            dataType: "json",
            method: "POST",
            contentType: "application/json",
            success: function (data, textStatus, jQxhr) {
                //Notify who sent the friend request that they are friend
                _CONNECTION.invoke("SendAcceptFriendRequest", senderId).catch(function (err) {
                    console.log("Error when notify add friend");
                });

                //Updating friend request list in who accept friend request sides
                ChatApplicationNamespace.GetFriendList();
                ChatApplicationNamespace.GetFriendRequestList();
            },
            error: function (jQxhr, textStatus, errorThrown) {
                console.log("Delete friend request error: " + errorThrown);
            }
        });
    }


    function sendDeleteFriendRequest(senderId) {
        $.ajax({
            //_USER is global attribute, it's declare in layout.cshtml
            // Sender is the one who send the request not the current user
            // The current user is the one who accept the friend request
            url: _BASE_ADDRESS + "/api/Users/RemoveFriendRequest/" + senderId + "/" + _USER.userId,
            dataType: "json",
            method: "DELETE",
            contentType: "application/json",
            success: function (data, textStatus, jQxhr) {
                //Notify other user
                //_CONNECTION.invoke("DeleteFriendRequest", friendObject.userId).catch(function (err) {
                //    console.log("Error when notify deleting friend");
                //});

                //Updating friend request list
                ChatApplicationNamespace.GetFriendRequestList();
            },
            error: function (jQxhr, textStatus, errorThrown) {
                console.log("Delete friend request error: " + errorThrown);
            }
        });
    }

}


// Don't use this
ContactListNamespace.LoadData = function (friendObjectList) {
    const GROUP_CONTACT_LIST_CONTAINER = CONTACT_PAGE_CONTAINER.find(".group-list-container .contact-list-container");


    ContactListNamespace.LoadFriendList(friendObjectList);
    ContactListNamespace.LoadFriendRequestList(friendRequestObjectList);

    let group = {
        id: 1,
        name: 'Bàn chuyện linh tinh',
        leaderId: 1,
        deputyId: 1,
        avatarURL: "https://xwatch.vn/upload_images/images/2023/05/22/anh-meme-la-gi.jpg",
        inviteURL: ""
    };


    let group2 = {
        id: 2,
        name: 'Công việc',
        leaderId: 2,
        deputyId: 2,
        avatarURL: "https://info.totalwellnesshealth.com/hs-fs/hubfs/Relax-2.png",
        inviteURL: ""
    };

    renderGroup(group);
    renderGroup(group2);
    // renderFriendRequest(user3);


    function renderGroup(userOject) {
        //   <div class="contact-list-container">
        // <div class="contact-row">
        //     <div class="contact-info-container">
        //         <div class="avatar-container">
        //             <img class="avatar-image" src="/img/user.png" />
        //         </div>
        //         <div class="user-name">
        //             <p>Lol</p>
        //         </div>
        //     </div>
        //     <div class="btn-container">
        //         <button class="btn btn-accept">Accept</button>
        //         <button class="btn btn-detail">...</button>
        //         <button class="btn btn-delete-friend">X</button>
        //     </div>
        // </div>
        // </div>
        let contactRow = generateElement("div", "contact-row");
        $(GROUP_CONTACT_LIST_CONTAINER).append($(contactRow));

        let contactInfoContainer = generateElement("div", "contact-info-container");
        let btnContainer = generateElement("div", "btn-container");
        $(contactRow).append(contactInfoContainer);
        $(contactRow).append(btnContainer);

        //contact info container
        let avatarContainer = generateElement("div", "avatar-container");
        let avatarImg = generateElement("img", "avatar-image");
        $(avatarImg).attr('src', userOject.avatarURL);
        $(avatarContainer).append(avatarImg);

        //username
        let userName = generateElement("div", "user-name");
        let name = generateElement("p", "");
        $(name).text(userOject.name);
        $(userName).append(name);

        $(contactInfoContainer).append(avatarContainer);
        $(contactInfoContainer).append(userName);

        //btn container
        let btnDetail = generateElement("button", "btn btn-detail");
        $(btnDetail).text("...");
        let btnDeleteFriend = generateElement("button", "btn btn-delete-friend");
        $(btnDeleteFriend).text("X");

        $(btnContainer).append(btnDetail);
        $(btnContainer).append(btnDeleteFriend);
    }
}
