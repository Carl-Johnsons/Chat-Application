import dataFacade from "../Lib/DataFacade/DataFacade.js";

//Search-bar script
$(document).ready(function () {
    const INFO_MODAL = $(".modal#info-modal");
    let container = $(".search-bar-container");
    let btnAddUser = container.find(".btn-add-friend");
    let btnCreateGroup = container.find(".btn-create-group");
    let searchBarInput = container.find(".search-bar-input");


    $(btnAddUser).click(async function () {
        let searchValue = $(searchBarInput).val();
        // Work right now, might need pop up to notify exception 404
        await dataFacade.searchUser(searchValue);
        $(INFO_MODAL).modal("show");
    });
});