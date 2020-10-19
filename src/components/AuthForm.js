import { authService } from 'myBase';
import React from 'react';
import { useState } from 'react';

const AuthForm = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error,setError] = useState('');
    const onChange = (event) => {
        const {target:{name,value}} = event;

        if(name === 'email'){
            setEmail(value)
        }else{
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let data;
        try { 
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password            )
            }else {
                data = await authService.signInWithEmailAndPassword(email, password)
            }
        }catch ( error){
            setError(error.message);
        }
    }

    const toggleAccount = () => { setNewAccount((prev) => !prev); };

    return(        
    <><form onSubmit = {onSubmit}  className="container">
        <input className="authInput" name='email' type='text' placeholder='' required value={email} onChange={onChange} />
        <input className="authInput" name='pass' type='password' placeholder='' required value={password} onChange={onChange} />
        <input className="authInput authSubmit" type='submit' value={newAccount ? 'Sign up' : 'Sign in'} />
        {error && <span className="authError">{error}</span>}
    </form>
    <span className="authSwitch" onClick={toggleAccount}>{newAccount ? 'Sign in' : 'Sign up'} </span>
    </>)
}

export default AuthForm;