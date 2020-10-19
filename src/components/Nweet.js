import { dbService, storageService } from 'myBase';
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure?')
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }

    const onSubmit = async(event) =>{
        event.preventDefault();
        console.log(nweetObj,newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        })
        toggleEditing();
    }
    const onChange =  (event) =>{
        const {
            target:{value}
        } = event;

        setNewNweet(value);
    }

    return (
        <div className="nweet">
            {
                editing ? <>
                    <form onSubmit={onSubmit}  className="container nweetEdit">
                        <input className="formInput" type='text' onChange={onChange} value={newNweet} required></input>
                        <input className="formBtn"  type='submit' value='Update'></input>
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </> : <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                        {isOwner && (
                                        <div className="nweet__actions">
                                        <span onClick={onDeleteClick}>
                                          <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                        <span onClick={toggleEditing}>
                                          <FontAwesomeIcon icon={faPencilAlt} />
                                        </span>
                                      </div>)}
                    </>
            }
        </div>
    )
}

export default Nweet;