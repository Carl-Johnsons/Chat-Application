
// render friendRequest real time
connection.on("ReceiveFriendRequest", function () {
    ChatApplicationNamespace.GetFriendRequestList();
});
