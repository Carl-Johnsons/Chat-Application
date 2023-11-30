import dataFacade from "./Lib/DataFacade/DataFacade.js";
import connectionInstance from "./Models/ChatHub.js";


connectionInstance.startConnection()
    .then(() => {
        dataFacade.loadUser();
        dataFacade.loadFriendList();
        dataFacade.loadFriendRequestList();
    })
    .catch(err => console.error(err));

