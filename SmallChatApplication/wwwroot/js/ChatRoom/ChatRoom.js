
// render friendRequest real time
_CONNECTION.on("ReceiveFriendRequest", function () {
    ChatApplicationNamespace.GetFriendRequestList();
});

// render friend list real time

_CONNECTION.on("ReceiveAcceptFriendRequest", function () {
    ChatApplicationNamespace.GetFriendList();
});

_CONNECTION.on("ReceiveIndividualMessage", function (senderId) {
    ChatApplicationNamespace.GetMessageList(senderId);
})

