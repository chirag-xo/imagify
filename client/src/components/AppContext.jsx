import axios from "axios";

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (Props) => {
    const [user, setuser] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [credit, setCredit] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCredit = async () => {
        try {
            console.log("HELLO")
            const { data } = await axios.get(`${backendUrl}/api/user/credit`, { headers: { token } })

            console.log("data : ", data)

            if (data.success) {
                setCredit(data.credit)
                setuser(data.user)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)

        }
    }
    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/image/generate-image`, { prompt }, { headers: { token } })
            if (data.success) {
                loadCredit()
                return data.image
            }
            else {
                toast.error(data.message)
                loadCredit()
                if (data.creditBalance === 0) {
                    navigate('/buy')
                }
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const logOut = () => {
        localStorage.removeItem('token')
        setuser(null)
        setToken('')
    }


    useEffect(()=>{
        if(token){
            loadCredit()
        }

    },[token])

    const value = {
        user, setuser,
        showLogin, setShowLogin,
        backendUrl,
        token, setToken,
        credit, setCredit,
        loadCredit,
        logOut,
        generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {Props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider