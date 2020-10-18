import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';
import { dbService, storageService } from 'myBase';
import React, { useEffect, useState } from 'react';

const Home = ({userObject}) => {
    const [nweets, setNweets] = useState([]);

    useEffect(()=>{
        dbService.collection('nweets').onSnapshot(onSnapshot=>{
            const nweetArray = onSnapshot.docs.map(doc =>({
                id:doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray);
         })
    },[])

    return(
        <div>
                <NweetFactory userObject={userObject}/>
            <div>
                {nweets.map((nweet) => (
                <Nweet key = {nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObject.uid}/>
                ))}
            </div>
        </div>
    )
}
export default Home;