
// render friendRequest real time
_CONNECTION.on("ReceiveFriendRequest", function () {
    ChatApplicationNamespace.GetFriendRequestList();
});

// render friend list real time

_CONNECTION.on("ReceiveAcceptFriendRequest", function () {
    ChatApplicationNamespace.GetFriendList();
});

_CONNECTION.on("ReceiveIndividualMessage", function (newIndividualMessage) {
    //convert Pascal Case attribute (Violate json naming covention) into camel case
    let newMessageObj = convertToCamelCase(JSON.parse(newIndividualMessage));
    console.log(newMessageObj);
    let senderId = ConservationListNamespace.GetActiveConversationUserId();

    if (newIndividualMessage && senderId == newMessageObj?.message?.senderId) {
        console.log("active conversation: " + newMessageObj?.message?.senderId);
        ChatApplicationNamespace.LoadNewMessage(newMessageObj);
    } else {
        console.log("the conversation didn't active: " + senderId + "|" + newMessageObj?.message?.senderId);
    }

})

function convertToCamelCase(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => convertToCamelCase(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
        const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
        acc[camelCaseKey] = convertToCamelCase(obj[key]);
        return acc;
    }, {});
}