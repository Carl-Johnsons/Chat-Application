﻿

ApplicationNavbarNamespace.LoadData = function loadData(user) {
    const APPLICATION_NAVBAR = $(".application-nav-bar");
    const avatarImg = APPLICATION_NAVBAR.find("a.nav-link#info-pop-up-container > img.avatar-img");
    avatarImg.attr("src", user.avatarUrl);
}