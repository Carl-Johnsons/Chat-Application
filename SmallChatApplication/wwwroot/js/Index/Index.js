"use strict";
const txtUser = document.querySelector("input#txtUser");
const txtRoom = document.querySelector("input#txtRoom");
const btnJoin = document.querySelector("button#btnJoin");


var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

btnJoin.addEventListener("click", function (event) {

    let userName = txtUser.value;
    let Room = txtRoom.value;


    //forwardToChatRoom(userName, Room);
    //connection.start().then(function () {
    //    console.log("Joining Room " + Room);

    //    connection.invoke("JoinRoom", userName, Room);
    //});

    //connection.invoke("SendMessage", user, message).catch(function (err) {
    //    return console.error(err.toString());
    //});
    //event.preventDefault();
});

async function forwardToChatRoom(userName,Room) {

    const request = new Request("/ChatRoom/PostConnectionToServer?userName=" + userName + "&room=" + Room);
    const options = {
        method: "GET"
    }
    const response = await fetch(request, options);
    if (response.ok) {
        // Redirect to the Index action after setting userConnection
        window.location.href = "/ChatRoom/Index";
    }
}

