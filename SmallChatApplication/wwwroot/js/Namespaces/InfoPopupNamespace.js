﻿var InfoPopupNamespace = InfoPopupNamespace || {};

InfoPopupNamespace.LoadData = function loadData(userObject, userType) {
    const INFO_POP_UP = $(".info-pop-up-container");
    const backgroundImg = INFO_POP_UP.find(".background-img-container > img");
    const avatarImg = INFO_POP_UP.find(".avatar-img-container > img");
    const name = INFO_POP_UP.find(".user-name > p");
    const infoDetail = INFO_POP_UP.find(".personal-information-container .personal-information-row-detail");
    // 0: Dien thoai
    // 1: Gioi tinh
    // 2: Ngay sinh

    backgroundImg.attr("src", userObject.backgroundUrl);
    avatarImg.attr("src", userObject.avatarUrl);
    name.text(userObject.name);
    infoDetail.eq(0).text(userObject.phoneNumber);
    infoDetail.eq(1).text(userObject.gender);


    // Parse the date string into a Date object
    let date = new Date(user.dob);

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Note that months are zero-based (0-11)
    let day = date.getDate();


    infoDetail.eq(2).text(`${day} tháng ${month}, ${year}`);


    // Button related
    const btnUpdateInfomation = INFO_POP_UP.find(".btn-update-information");
    const btnAddFriend = INFO_POP_UP.find(".btn-add-friend");

    hideAllBtns();

    if (userType == "Self") {
        $(btnUpdateInfomation).show();
    } else if (userType == "Stranger") {
        $(btnAddFriend).show();
    }

    $(btnAddFriend).click(function () {
        $.ajax({
            url: BASE_ADDRESS + "/api/Users/SendFriendRequest/" + user.userId + "/" + userObject.userId,
            dataType: 'json',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                content: "Xin chào! tôi là " + user.name
            }),
            success: function (data, textStatus, jQxhr) {
                console.log("send friend request successfully");
                // Friend Request JSON format
                //{
                //    "senderId": 1,
                //    "receiverId": 3,
                //    "content": "string",
                //    "date": "2023-10-20T23:40:53.8730141+07:00",
                //    "status": "Pending",
                //    "receiver": null,
                //    "sender": null
                //}

                // Notfiy other user if they are online
                // The data is FriendRequest datatype
                ChatApplicationNamespace.GetFriendRequestList();
                connection.invoke("SendFriendRequest", data).catch(function (err) {
                    console.error("error when SendFriendRequest: " + err.toString());
                });
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });


    function hideAllBtns() {
        $(btnUpdateInfomation).hide();
        $(btnAddFriend).hide();
    }

}