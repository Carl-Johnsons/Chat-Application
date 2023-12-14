import dataFacade from "./Lib/DataFacade/DataFacade.js";
import connectionInstance from "./Models/ChatHub.js";


connectionInstance.startConnection()
    .then(async () => {
        // wait for loading the current user because everything depend on it
        await dataFacade.loadUser();
        dataFacade.loadFriendList();
        dataFacade.loadFriendRequestList();
    })
    .catch(err => console.error(err));

