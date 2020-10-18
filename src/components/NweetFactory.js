import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const NweetFactory = ({userObject}) => {
    const [nweet, setNweet] =useState('');
    const [attachment , setAttachment] = useState();

    const onSubmit = async (event) =>{
        event.preventDefault();
        let attachmentUrl='';
        if(attachment !=''){
            const attachmentRef = storageService.ref().child(`${userObject.uid}/${uuidv4()}`)
            const response =  await attachmentRef.putString(attachment, 'data_url')
            attachmentUrl = await response.ref.getDownloadURL();
        }
                const nweetObject = {
                    text:nweet,
                    createTime : Date.now(),
                    creatorId : userObject.uid,
                    attachmentUrl
                }

        await dbService.collection('nweets').add(nweetObject);
        setNweet('');
        setAttachment('');
    }

    const onChange = (event) =>{
        const {target:{value}} = event;
        setNweet(value);
    }

    const onFileChange = (event) => {
        const {
            target:{files}
        } = event;

        const theFile = files[0];
        const reader = new FileReader();
        reader.onload = (event) =>{
            const {
                currentTarget:{result}
            } = event
            setAttachment(result);
        }
        try {
            reader.readAsDataURL(theFile);
        } catch (error) {
            console.log(error)            
        }
    }

    const onClearAttachmentClick = () => {
        setAttachment(null);
    }
    return (
    <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type='text' placeholder='What is on your mind'></input>
        <input type='file' accept='image/*' onChange={onFileChange}></input>
        <input type='submit' value='nweet'></input>
        <img src={attachment} width='50px' hight='50px'></img>
        <button onClick={onClearAttachmentClick}>Clear</button>
    </form>)    
}

export default NweetFactory;