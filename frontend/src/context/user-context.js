import { useState, useEffect, createContext, useContext } from "react"
import { NotificationManager } from "react-notifications"
import { BackendApi } from "../client/backend-api"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext({
    user: null,
    loginUser: () => { },
})

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(user && user.role === 'admin')
    }, [user])

    useEffect(() => {
        BackendApi.user.getProfile().then(({ user, error }) => {
            if (error) {
                console.error(error)
            } else {
                setUser(user)
            }
        }).catch(console.error)
    }, [])

    /*const loginUser = async (username, password) => {
        const { user, error } = await BackendApi.user.login(username, password)
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Logged in successfully")
            setUser(user)
        }
    }*/
    const loginUser = async (username, password) => {
        try {
            // Sign in with the email and password
            var user = await signInWithEmailAndPassword(auth, username, password);
            NotificationManager.success("Logged in successfully")
            setUser(user.user);
        } catch (error) {
            // Handle sign-in errors
            console.error('Sign-in error:', error);

            // Display the error message to the user
            if (error.code === 'auth/user-not-found') {

                NotificationManager.error('User not found')
            } else if (error.code === 'auth/wrong-password') {
                // Handle the case where the password is incorrect
                NotificationManager.error('Incorrect password')

            } else {
                // Handle other authentication errors
                NotificationManager.error(error.message)
            }

            // You can also display the error message to the user using a notification or alert
            // For example, if you are using a notification library like react-toastify:
            // toast.error(error.message);
        }
        /*.then((userCredential) => {
            NotificationManager.success("Logged in successfully")
            setUser(userCredential)
        })
        .catch((error) => {
            NotificationManager.error(error)
            // ..
        });
      
      var user =   await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });*/
    }

    const logoutUser = async () => {
        setUser(null)
        await BackendApi.user.logout()
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export { useUser, UserProvider }