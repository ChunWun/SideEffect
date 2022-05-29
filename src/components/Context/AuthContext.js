import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    isLoggin: false,
    onLogin: (email, password) => { },
    onLogout: () => { }
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const storageDataList = {
        IS_LOGGINED: "isLoggined"
    }

    useEffect(() => {
        const storageUserLogginedData = (localStorage.getItem(storageDataList.IS_LOGGINED) === 'true');
        setIsLoggedIn(storageUserLogginedData);

    }, [])

    const loginHandler = (email, password) => {
        localStorage.setItem(storageDataList.IS_LOGGINED, true);
        setIsLoggedIn((localStorage.getItem(storageDataList.IS_LOGGINED) === 'true'));
    };

    const logoutHandler = () => {
        localStorage.setItem(storageDataList.IS_LOGGINED, false);
        setIsLoggedIn((localStorage.getItem(storageDataList.IS_LOGGINED) === 'true'));
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggin: isLoggedIn,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }}
        >
            {props.children}
        </AuthContext.Provider >
    );
}

export default AuthContext