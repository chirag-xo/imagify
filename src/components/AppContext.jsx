import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (Props) => {
    const [user, setuser] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const value = {
        user,
        setuser,
        showLogin,
        setShowLogin,
    }
    return (
        <AppContext.Provider value={value}>
            {Props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider