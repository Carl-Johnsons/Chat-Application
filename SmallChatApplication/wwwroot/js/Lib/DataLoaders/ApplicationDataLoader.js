export default class ApplicationDataLoader {
    constructor() {

    }
    static loadUserData(user) {
        const APPLICATION_NAVBAR = $(".application-nav-bar");
        const avatarImg = APPLICATION_NAVBAR.find("a.nav-link[data-content=info-modal] > img.avatar-img");
        avatarImg.attr("src", user.avatarUrl);
    }
}
