import UserInstance from "../../Models/User.js";
import dataFacade from "../DataFacade/DataFacade.js";

export default class InfoModalDataLoader {
    static USER_TYPE = {
        SELF: "Self",
        FRIEND: "Friend",
        STRANGER: "Stranger"
    };

    constructor() {

    }
    static loadUserData(userObject, userType) {
        if (!userType) {
            throw new Error("User type is not valid");
        }
        const INFO_MODAL = $(".modal#info-modal");
        const BACKGROUND_IMG = INFO_MODAL.find(".background-img-container > img");
        const AVATAR_IMG = INFO_MODAL.find(".avatar-img-container > img");
        const USER_NAME = INFO_MODAL.find(".user-name > p");
        const INFO_DETAIL = INFO_MODAL.find(".personal-information-container .personal-information-row-detail");
        // 0: Dien thoai
        // 1: Gioi tinh
        // 2: Ngay sinh

        BACKGROUND_IMG.attr("src", userObject.backgroundUrl);
        AVATAR_IMG.attr("src", userObject.avatarUrl);
        USER_NAME.text(userObject.name);
        INFO_DETAIL.eq(0).text(userObject.phoneNumber);
        INFO_DETAIL.eq(1).text(userObject.gender);


        // Parse the date string into a Date object
        let date = new Date(userObject.dob);

        let year = date.getFullYear();
        let month = date.getMonth() + 1; // Note that months are zero-based (0-11)
        let day = date.getDate();


        INFO_DETAIL.eq(2).text(`${day} tháng ${month}, ${year}`);


        // Button related
        const btnUpdateInfomation = INFO_MODAL.find(".btn-update-information");
        const btnAddFriend = INFO_MODAL.find(".btn-add-friend");

        hideAllBtns();

        if (userType == this.USER_TYPE.SELF) {
            $(btnUpdateInfomation).show();
        } else if (userType == this.USER_TYPE.STRANGER) {
            $(btnAddFriend).show();
            console.log("show btnAddFriend");
        }

        // This popup i didn't generate and reuse the element so have to update the event listener
        //Remove an existing event listener
        $(btnAddFriend).off("click").click( function () {
             dataFacade.fetchSendFriendRequest(UserInstance.getUser(), userObject.userId);
        });

        function hideAllBtns() {
            $(btnUpdateInfomation).hide();
            $(btnAddFriend).hide();
        }
    }
}