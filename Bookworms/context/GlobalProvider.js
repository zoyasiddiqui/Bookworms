import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from '../lib/supabase';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [session, setSession] = useState(null) 
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      // fetch current authentication session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      // listens for changes in the authentication state (i.e. logging in)
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    }, [])

    return (
        <GlobalContext.Provider 
            value={{session, setSession, uploading, setUploading, loading, setLoading}}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider