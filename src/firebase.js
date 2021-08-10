import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCZRI68I0i8UQdGYlZieHwFsFTUvdEha3M",
    authDomain: "quackqueek-62905.firebaseapp.com",
    databaseURL: "https://quackqueek-62905-default-rtdb.firebaseio.com",
    projectId: "quackqueek-62905",
    storageBucket: "quackqueek-62905.appspot.com",
    messagingSenderId: "183478636779",
    appId: "1:183478636779:web:acfb4c9d6e2b0c9b35aeae",
    measurementId: "G-8NG8PT7T8Q"
})

export const auth = app.auth()
export default app