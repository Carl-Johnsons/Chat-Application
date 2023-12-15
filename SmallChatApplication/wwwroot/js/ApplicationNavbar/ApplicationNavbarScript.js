$(document).ready(function () {
    const CONVERSATION_PAGE = $(".conversation-page");
    const CONTACT_PAGE = $(".contact-page");
    const INFO_POPUP = $(".modal#info-modal");
    const UPDATE_INFO_POPUP = $(".modal#update-info-modal");

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
                let dataContent = $(this).attr("data-content");
                console.log({ dataContent });
                switch (dataContent) {
                    case "info-modal":
                        hideAllPopUps();
                        showModal($("#" + dataContent));
                        break;
                    default:
                        if (type === eventType.PHONE) {
                            reset2Section();
                        }
                        //normal event
                        hideAllPages();
                        //Show 2 div class name that equal to id
                        showPage($("." + dataContent));
                        disableAllNavLinks();
                        activateNavLinks($(this));
                        break;
                }
            });
        });
    }


    function reset2Section() {
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
    function showModal(object) {
        $(object).modal("show");
    }
    function hideAllPopUps() {
        $(INFO_POPUP).modal("hide");
        $(UPDATE_INFO_POPUP).hide();
    }
});