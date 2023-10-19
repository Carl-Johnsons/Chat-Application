var InfoPopupNamespace = InfoPopupNamespace || {};

InfoPopupNamespace.LoadData = function loadData(user) {
    const INFO_POP_UP = $(".info-pop-up-container");

    const backgroundImg = INFO_POP_UP.find(".background-img-container > img");
    const avatarImg = INFO_POP_UP.find(".avatar-img-container > img");
    const name = INFO_POP_UP.find(".user-name > p");
    const infoDetail = INFO_POP_UP.find(".personal-information-container .personal-information-row-detail");
    // 0: Dien thoai
    // 1: Gioi tinh
    // 2: Ngay sinh

    backgroundImg.attr("src", user.backgroundUrl);
    avatarImg.attr("src", user.avatarUrl);
    name.text(user.name);
    infoDetail.eq(0).text(user.phoneNumber);
    infoDetail.eq(1).text(user.gender);


    // Parse the date string into a Date object
    let date = new Date(user.dob);

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Note that months are zero-based (0-11)
    let day = date.getDate();


    infoDetail.eq(2).text(`${day} tháng ${month}, ${year}`);
}