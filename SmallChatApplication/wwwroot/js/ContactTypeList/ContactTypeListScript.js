$(document).ready(function () {
    const FRIEND_LIST_PAGE = "friend-list-container";
    const GROUP_LIST_PAGE = "group-list-container";
    const FRIEND_REQUEST_LIST_PAGE = "friend-request-list-container";


    const LEFT_SECTION = $(".left");
    const LEFT_LIST_SECTION = LEFT_SECTION.find(".list-section");
    const RIGHT_SECTION = $(".right");

    let contactTypeListContainer = $("div.contact-type-list-container");
    let contactTypes = $(contactTypeListContainer).find(".contact-type");

    //responsive event
    let widthMatch = window.matchMedia("(min-width: 768px)");
    addClickEvent(widthMatch);
    widthMatch.addEventListener("change", function () {
        addClickEvent(widthMatch);
    });
    function addClickEvent(widthMatch) {
        if (widthMatch.matches) {
            normalClickEvent();
        } else {
            phoneClickEvent();
        }
    }
    function normalClickEvent() {
        contactTypes.each(function () {
            $(this).off('click').click(function () {
                hideAllPages();
                let clickId = $(this).prop("id");
                showPage(clickId);
                disableAllContactType();
                activateContactType($(this));
            });

        });
    }
    function phoneClickEvent() {
        contactTypes.each(function () {
            $(this).off('click').click(function () {
                hideAllPages();
                let clickId = $(this).prop("id");
                showPage(clickId);
                disableAllContactType();
                activateContactType($(this));

                // The left list section should display none to save space for the right section
                if (!$(LEFT_LIST_SECTION).hasClass("d-none")) {
                    $(LEFT_SECTION).addClass("left-mobile");
                    $(LEFT_LIST_SECTION).addClass("d-none");
                }
                if ($(RIGHT_SECTION).hasClass("d-md-block")
                    && $(RIGHT_SECTION).hasClass("d-none")) {
                    $(RIGHT_SECTION).removeClass("d-none");
                    $(RIGHT_SECTION).removeClass("d-md-block");
                }
            });
        });

    }

    function activateContactType(divElement) {
        divElement.addClass("active");
    }
    function disableAllContactType() {
        contactTypes.each(function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
            }
        });
    }
    function showPage(className) {
        $("." + className).show();
    }

    function hideAllPages() {
        $("." + FRIEND_LIST_PAGE).hide();
        $("." + GROUP_LIST_PAGE).hide();
        $("." + FRIEND_REQUEST_LIST_PAGE).hide();
    }
});