import React, { Component, useState, useRef } from 'react';
import "firebase/firestore";

function DeleteComp(props){
    const handleRemoveMsg = async () =>{
        //Check that the current user owns the card
        if(props.uid == props.currentUser){
            try{
                await props.firestore.collection('messages').doc(props.msgId).delete();
                console.log('Msg removed sucessfully');
            }catch (error){
                console.log(error)
            }
        }else{
            alert('You do not own this card (ID mismatch)')
        }
    }
    
return (
<div>
    <p className={`removeCard ${props.displayState}`}><span onClick={() => handleRemoveMsg()} className='removeSpan'>X</span></p>
</div>
)}

export default DeleteComp