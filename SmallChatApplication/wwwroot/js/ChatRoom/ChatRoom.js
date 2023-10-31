
// render friendRequest real time
_CONNECTION.on("ReceiveFriendRequest", function () {
    ChatApplicationNamespace.GetFriendRequestList();
});

// render friend list real time

_CONNECTION.on("ReceiveAcceptFriendRequest", function () {
    ChatApplicationNamespace.GetFriendList();
});

_CONNECTION.on("ReceiveIndividualMessage", function (newIndividualMessage) {
    let newMessageObj = convertToCamelCase(JSON.parse(newIndividualMessage));
    console.log(newMessageObj);
    ChatApplicationNamespace.LoadNewMessage(newMessageObj);
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