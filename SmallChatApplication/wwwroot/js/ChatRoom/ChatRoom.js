
const urlSearch = new URLSearchParams(window.location.search);
const userName = urlSearch.get("txtUser");
const room = urlSearch.get("txtRoom");
const btnSendMessage = document.querySelector("button#btn-send-message");

const msgContainer = document.querySelector("div#message-container");



var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.start().then(function () {
    connection.invoke("JoinRoom", userName, room).then(function () {
        console.log("it's working");
    });
});

//console.log(connection);
connection.on("ReceiveMessage", function (user, message) {
    renderMessage(user, message);
});

function renderMessage(user, message) {
    let msg = document.createElement("div");
    msg.className = "message";
    msg.id = user == userName ? "Sender" : "Receiver";
    msg.innerText = message;

    msgContainer.appendChild(msg);

    //Scroll to child element
    msg.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });

}


btnSendMessage.addEventListener("click", function () {
    sendMessageToGroup();
});
txtMessage.addEventListener("focus", function () {
    txtMessage.addEventListener("keyup", function (event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            sendMessageToGroup();

        }
    });
})


function sendMessageToGroup() {
    const inputMsg = document.querySelector("input#txtMessage");
    if (inputMsg.value.length != 0) {
        connection.invoke("SendMessageToGroup", { Name: userName, Room: room }, inputMsg.value);
        //Reset input
        txtMessage.value = '';
    }
}

