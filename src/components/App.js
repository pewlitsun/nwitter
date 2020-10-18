import React, {useEffect, useState} from 'react';
import AppRouter from './Router';
import {authService} from '../myBase'

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject,setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) =>{
      if(user){
        setIsLoggedIn(true);
        setUserObject({
          displayName:user.displayName,
          uid:user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      }else{
        setIsLoggedIn(false);
        // setUserObject(null)
      }
      setInit(true);
    })
  },[])
  const refreshUser = () =>{
    const user = authService.currentUser;
    setUserObject({
      displayName:user.displayName,
      uid:user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObject = {userObject}></AppRouter>: 'inital...'}
    </>
  );
}

export default App;
