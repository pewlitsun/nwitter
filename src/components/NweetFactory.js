import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObject}) => {
    const [nweet, setNweet] =useState('');
    const [attachment , setAttachment] = useState();

    const onSubmit = async (event) =>{
        if (nweet === "") {
            return;
          }
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

    const onClearAttachment = () => {
        setAttachment('');
    }
    return (
        <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
        
        <input id="attach-file" value={nweet} onChange={onChange} type='text' placeholder='What is on your mind' style={{
          opacity: 0,
        }}></input>
        {/* <input type='file' accept='image/*' onChange={onFileChange}></input> */}
        {/* <input type='submit' value='nweet'></input> */}
        {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
            </div></div>)}
    </form>)    
}

export default NweetFactory;