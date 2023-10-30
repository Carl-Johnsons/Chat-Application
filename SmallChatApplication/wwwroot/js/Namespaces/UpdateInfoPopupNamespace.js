var UpdateInfoPopupNamespace = UpdateInfoPopupNamespace || {};

UpdateInfoPopupNamespace.LoadData = function (user) {
    console.log("load data update info")

    const UPDATE_INFO_POPUP_CONTAINER = $(".update-info-popup-container");

    //DoB
    const selectDoBContainer = UPDATE_INFO_POPUP_CONTAINER.find("div.personal-information-row-detail.input-date");
    const dateSelect = selectDoBContainer.find("select[name=date]");
    const monthSelect = selectDoBContainer.find("select[name=month]");
    const yearSelect = selectDoBContainer.find("select[name=year]");
    const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


    //img
    const backgroundImg = UPDATE_INFO_POPUP_CONTAINER.find(".background-img-container img");
    const avatarImg = UPDATE_INFO_POPUP_CONTAINER.find(".avatar-img-container img");
    console.log("==================================");
    console.log(backgroundImg);
    console.log(avatarImg);
    //name
    const userNameInput = UPDATE_INFO_POPUP_CONTAINER.find("div.user-name > input");
    //gender
    const genderRadiobtns = UPDATE_INFO_POPUP_CONTAINER.find("div.personal-information-row-detail > input[name=rdoGender]");


    // Generate select dynamically
    for (let i = 1; i <= 31; i++) {
        addOption(dateSelect, i);
        if (i <= 12) {
            addOption(monthSelect, i);
        }
    }
    for (let i = 2023 - 50; i <= 2023 + 6; i++) {
        addOption(yearSelect, i);
    }

    monthSelect.change(function () {
        checkDate();
    });

    yearSelect.change(function () {
        checkDate();
    });



    //==================  load data dynamically ==================
    loadData(user);
    //==================  load data dynamically ==================
    function loadData(userObject) {
        if (userObject === null) {
            return;
        }

        backgroundImg.attr('src', userObject.backgroundUrl);
        avatarImg.attr('src', userObject.avatarUrl);
        userNameInput.val(userObject.name);

        if (userObject.gender === "Nam") {
            $(genderRadiobtns[0]).prop('checked', true);
        } else if (userObject.gender === "Nữ") {
            $(genderRadiobtns[1]).prop('checked', true);
        }
        // Parse the date string into a Date object
        let date = new Date(user.dob);

        let year = date.getFullYear();
        let month = date.getMonth() + 1; // Note that months are zero-based (0-11)
        let day = date.getDate();

        yearSelect.val(parseInt(year));
        monthSelect.val(parseInt(month));
        dateSelect.val(parseInt(day));
        //Validate day
        checkDate();
    }

    // Validate date, month, year
    function checkDate() {
        let maxDay = getMaxDayinMonth(monthSelect.val(), yearSelect.val());
        let currentDate = dateSelect.val();
        dateSelect.empty();
        for (let i = 1; i <= maxDay; i++) {
            addOption(dateSelect, i);
        }
        if (currentDate > maxDay) {
            dateSelect.val(maxDay);
        } else {
            dateSelect.val(currentDate);
        }
    }


    function getMaxDayinMonth(month, year) {
        switch (parseInt(month)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 2:
                return 28 + (isLeapYear(parseInt(year)) ? 1 : 0);
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
        }
    }

    function isLeapYear(year) {
        return (year % 400 === 0) || (year !== 100 && year % 4 === 0);
    }

    function addOption(select, optionValue) {
        let optionElement = document.createElement("option");
        optionElement.value = optionValue;
        optionElement.text = optionValue;

        optionElement.click(function () {
            optionElement.prop('selected', true);
        });

        select.append(optionElement);
    }

    //Update profile action
    const btnUpdatebtn = UPDATE_INFO_POPUP_CONTAINER.find(".btn-update-information");

    btnUpdatebtn.click(function () {
        if (!user) {
            return;
        }
        user.name = $(userNameInput).val();

        // Format date month year that match System.DateTime
        const year = parseInt(yearSelect.val());
        const month = parseInt(monthSelect.val());
        const day = parseInt(dateSelect.val());

        // Create a JavaScript Date object with the extracted values
        const dobDate = new Date(year, month - 1, day); // Subtract 1 from the month to match JavaScript's zero-based months.
        // Format the date as a string in "YYYY-MM-DD" format
        // toISOstring is wrong because it subtract day by 1 for some reason.
        const formattedDOB = dobDate.toLocaleDateString('pt-br').split('/').reverse().join('-');;
        user.dob = formattedDOB;


        //Get gender value
        user.gender = $(genderRadiobtns).filter(":checked").val();
        user.avatarUrl = $(avatarImg).attr('src');
        user.backgroundUrl = $(backgroundImg).attr('src');

        $.ajax({
            url: BASE_ADDRESS + "/api/Users/" + user.userId,
            dataType: 'json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function (data, textStatus, jQxhr) {
                console.log("User updated successfully:");

                $(UPDATE_INFO_POPUP_CONTAINER).hide();
                ChatApplicationNamespace.LoadUserData(user);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                // Handle error response here
                console.log("Error updating user:", errorThrown);
            }
        });

    });
};