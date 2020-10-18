import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'myBase';
import React, { useState } from 'react';

const Auth = () => {
    const [error] = useState('');
    const onSocialClick = async (event) => {
         const provider = new firebaseInstance.auth.GoogleAuthProvider();
         await authService.signInWithPopup(provider);
    }
    return (<div>
        <AuthForm/>
        <div>
            <button onClick={onSocialClick}>Google Log in</button>
            {error}
        </div>
    </div>
    )
}
export default Auth;