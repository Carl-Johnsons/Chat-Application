
// render friendRequest real time
connection.on("ReceiveFriendRequest", function () {
    ChatApplicationNamespace.GetFriendRequestList();
});

// render friend list real time

connection.on("ReceiveAcceptFriendRequest", function () {
    console.log("=========================================");
    console.log("Receive accept friend request notification");
    ChatApplicationNamespace.GetFriendList();
    console.log("abc");
});

