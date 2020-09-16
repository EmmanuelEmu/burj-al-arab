import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.Config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    //initialize the firebase application
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    //Using Context API
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    //Protected and public authentication
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    //Sign in With Google
    const handleSignInWithGoogleButton = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            const signedInUser = { name: user.displayName, email: user.email };
            setLoggedInUser(signedInUser);
            history.replace(from);
            // ...
            console.log(user);
        }).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            // ...
        });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleSignInWithGoogleButton}>Sign in with google</button>
        </div>
    );
};

export default Login;