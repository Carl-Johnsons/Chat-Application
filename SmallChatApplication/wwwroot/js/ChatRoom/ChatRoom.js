
// render friendRequest real time
_CONNECTION.on("ReceiveFriendRequest", function () {
    ChatApplicationNamespace.GetFriendRequestList();
});

// render friend list real time

_CONNECTION.on("ReceiveAcceptFriendRequest", function () {
    console.log("=========================================");
    console.log("Receive accept friend request notification");
    ChatApplicationNamespace.GetFriendList();
    console.log("abc");
});

