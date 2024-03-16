import { createGlobalState } from "react-hooks-global-state";

const {setGlobalState, useGlobalState} = createGlobalState({
    user: {
        uid: localStorage.getItem("uid") as string,
        firstName: localStorage.getItem("firstName") as string,
        lastName: localStorage.getItem("lastName") as string,
        email: localStorage.getItem("email") as string,
        manager: localStorage.getItem("manager") == 'true',
        notifications: localStorage.getItem("notifications") == 'true'
    },
    org: {
        oid: localStorage.getItem("oid") as string,
        name: localStorage.getItem("orgname"),
        ownerId: localStorage.getItem("ownerId"),
        users: localStorage.getItem("users")
    },
});

export {setGlobalState, useGlobalState}