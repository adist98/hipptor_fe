import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../firebase'
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    async function signup(email,password, displayName) {
        let createUser = await auth.createUserWithEmailAndPassword(email, password)
        const user = auth.currentUser;
        user.updateProfile({
            displayName: displayName
          })
        console.log("hello there", JSON.stringify(createUser))
        return createUser
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut();
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged (user => {
            setCurrentUser(user)
            setLoading(false)
        })    
        return unsubscribe
    }, [])

  
    const value = {
        currentUser,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
