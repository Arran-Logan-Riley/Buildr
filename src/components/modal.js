import React, { Component, useState, useRef } from 'react';
import Modal from "react-overlays/Modal";
import firebase from "firebase/app";
import "firebase/firestore";


function Modal_html(auth,user, firestore) {
  console.log(user,auth);

  const [showModal, setShowModal] = useState(false);
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  var handleClose = () => setShowModal(false);
  const [formValue, setFormValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [BOM, setBOM] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    await auth.firestore.collection("messages").add({
      projectName: formValue,
      startDate: startDate,
      endDate: endDate,
      material: BOM,
    });
    handleClose(); // close the modal after saving the data
  }

  return (
    <div>
      <div className="modal-example" onClick={() => setShowModal(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
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
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
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
                <input type={'text'}></input>
              </div>
            </div>
            <div>
              <label>Number of Material</label>
            </div>
            <div>
              <input type={'number'}></input>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={handleClose}>
                Close
              </button>
              <button className="primary-button" onClick={(e) => sendMessage(e, firestore)}>
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