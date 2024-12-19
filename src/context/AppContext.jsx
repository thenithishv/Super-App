import {  createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({children})=>{
    const [user,setUser] =useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const[selectGeneres, setSelectGeneres]=useState(
        JSON.parse(localStorage.getItem("user")) || []
    );
    return(
        <AppContext.Provider
            value={[
                user,
                setUser,
                selectGeneres,
                setSelectGeneres,
            ]}
        >
            {children}
        </AppContext.Provider>
    );
};
