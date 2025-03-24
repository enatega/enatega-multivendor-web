import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext({} as {});


export default function AuthProvider({ children }: { children: ReactNode }) {
    // States
    const [authToken, setAuthToken] = useState('');
    // Hooks
    const router = useRouter();

    // Local Vars
    const token = localStorage.getItem('token');

    // UseEffects
    useEffect(()=>{
        if(token){
            setAuthToken(token)
        }
    },[token, router])
  return <AuthContext.Provider value={{authToken}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);