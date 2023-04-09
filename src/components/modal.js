import React, { Component, useState, useRef } from 'react';
import Modal from "react-overlays/Modal";
import firebase from "firebase/app";
import "firebase/firestore";


function Modal_html(props) {
  //console.log(props)
  const dummy = useRef();
  const [showModal, setShowModal] = useState(false);
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  var handleClose = () => setShowModal(false);
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [material, setMaterial] = useState('');
  const [materialNum, setMaterialNum] = useState('');
  const {uid, photoURL} = props.currentUser

  const sendMessage = async (e) => {
    e.preventDefault();
    await props.firestore.collection("messages").add({
      createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
      projectName: projectName,
      startDate: startDate,
      endDate: endDate,
      material: material,
      materialNum: materialNum,
      uid,
      photoURL,
      msgId: '',
    }).then((sendObj) =>{
      //Inline function to creaete msg id from google
      sendObj.update({
        msgId: sendObj.id
      })
    });
    //Set all states to empty
    setProjectName('');
    setStartDate('');
    setEndDate('');
    setMaterial('');
    setMaterialNum('');
    handleClose(); // close the modal after saving the data
    //dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div>
      <div className="modal-example" onClick={() => setShowModal(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </div>
      <p>Create New Building Entry</p>
      <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className="modal-header">
            <div className="modal-title">Create New Building Entry</div>
            <div>
              <span className="close-button" onClick={handleClose}>
                x
              </span>
            </div>
          </div>
          <label>Name Of Project</label>
          <form className='modalBoxCreate'>
            <input value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            <div>
              <div>
                <label>Start Date</label>
              </div>
              <input value={startDate} type={'date'} onChange={(e) => setStartDate(e.target.value)}></input>
            </div>
            <div>
              <div>
                <label>End Date</label>
              </div>
              <input value={endDate} type={'date'} onChange={(e) => setEndDate(e.target.value)}></input>
            </div>
            <div>
              <label>Name of Material</label>
              <div>
                <input value={material} type={'text'} onChange={(e) => setMaterial(e.target.value)}></input>
              </div>
            </div>
            <div>
              <label>Number of Material</label>
            </div>
            <div>
              <input value={materialNum} type={'number'} onChange = {(e)=> setMaterialNum(e.target.value)}></input>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={handleClose}>
                Close
              </button>
              <button className="primary-button" onClick={(e) => sendMessage(e, props.firestore)}>
                Save Project
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
  }
export default Modal_html;