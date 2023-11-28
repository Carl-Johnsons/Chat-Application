$(document).ready(function () {
    const CONVERSATION_PAGE = $(".conversation-page");
    const CONTACT_PAGE = $(".contact-page");
    const INFO_POPUP = $(".info-pop-up-container");
    const UPDATE_INFO_POPUP = $(".update-info-popup-container");

    const LEFT_SECTION = $(".left");
    const LEFT_LIST_SECTION = LEFT_SECTION.find(".list-section");
    const RIGHT_SECTION = $(".right");

    // Animation
    let navLinks = $(".application-nav-bar .nav-link");

    //responsive event
    let widthMatch = window.matchMedia("(min-width: 768px)");
    //declare enum type
    let eventType = {
        NORMAL: "normal",
        PHONE: "phone"
    }

    if (widthMatch.matches) {
        clickEvent(eventType.NORMAL);
    } else {
        clickEvent(eventType.PHONE);
    }

    widthMatch.addEventListener("change", function () {
        if (widthMatch.matches) {
            clickEvent(eventType.NORMAL);
        } else {
            clickEvent(eventType.PHONE);
        }
    });
    function clickEvent(type) {
        if (type === eventType.NORMAL) {
            // If normal event is applied reset the state of 2 sections
            reset2Section();
        }

        navLinks.each(function () {
            $(this).off("click").click(function () {
                let clickId = $(this).prop("id");
                switch (clickId) {
                    case "info-pop-up-container":
                        hideAllPopUps();
                        showPopUp($("." + clickId));
                        break;
                    default:
                        if (type === eventType.PHONE) {
                            reset2Section();
                        }
                        //normal event
                        hideAllPages();
                        //Show 2 div class name that equal to id
                        showPage($("." + clickId));
                        disableAllNavLinks();
                        activateNavLinks($(this));
                        break;
                }
            });
        });
    }


    function reset2Section() {
        console.log("RESET 2 section");
        if ($(LEFT_LIST_SECTION).hasClass("d-none")) {
            $(LEFT_SECTION).removeClass("left-mobile");
            $(LEFT_LIST_SECTION).removeClass("d-none");
        }
        if (!(
            $(RIGHT_SECTION).hasClass("d-md-block")
            && $(RIGHT_SECTION).hasClass("d-none"))
        ) {
            $(RIGHT_SECTION).addClass("d-none");
            $(RIGHT_SECTION).addClass("d-md-block");
        }
    }

    function disableAllNavLinks() {
        navLinks.each(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            }
        });
    }
    function activateNavLinks(navLinkObject) {
        navLinkObject.addClass("active");
    }
    function hideAllPages() {
        $(CONVERSATION_PAGE).hide();
        $(CONTACT_PAGE).hide();
    }
    function showPage(object) {
        $(object).show();
    }
    function hideAllPopUps() {
        $(INFO_POPUP).hide();
        $(UPDATE_INFO_POPUP).hide();
    }
    function showPopUp(popUpName) {
        $(popUpName).show();
    }
});