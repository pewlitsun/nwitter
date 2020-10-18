import { authService, dbService } from 'myBase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default ({userObject, refreshUser}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
    const onSignOutCLick = () =>{
        authService.signOut();
        history.push('/');
    }
    const getMyNweets = async()=>{
        const nweets = await dbService.collection('nweets')
        .where('creatorId','==',userObject.uid)
        .orderBy('createdAt','asc')
        .get();
        console.log(nweets.docs.map(doc => doc.data()))
    }
    useEffect(()=>{
        getMyNweets();
    },[])

    const onChange = (event) =>{
        const {
            target:{value}
        } = event;
        setNewDisplayName(value)
    }

    const onSubmit = async(event) =>{
        event.preventDefault();
        if(newDisplayName !== userObject.displayname){
            await userObject.updateProfile({
                displayName:newDisplayName
            });
            refreshUser();
        }
    }
    return (
        <>
        <form  onSubmit={onSubmit} >
            <input type='text' onChange ={onChange}></input>
            <input type='submit' value ='updata your porfile'></input>
        </form>
            <button onClick ={onSignOutCLick}>Sign Out</button>
        </>
        )
}