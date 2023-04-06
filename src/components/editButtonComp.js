import React, { Component, useState, useRef } from 'react';
import "firebase/firestore";
import Modal from "react-overlays/Modal";

function EditComp(props){
    const [showModal, setShowModal] = useState(false);
    const renderBackdrop = (props) => <div className="backdrop" {...props} />;
    var handleClose = () => setShowModal(false);
    const [newFormValue, setNewFormValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [newBOM, setNewBOM] = useState('');
    const [newMaterialNum, setNewMaterialNum] = useState('');
    const editCardData = async (e) => {
        e.preventDefault();
        console.log('I have been clicked');
        try{
            await props.firestore.collection('messages').doc(props.msgId).update({
                projectName: newFormValue,
                material: newBOM,
                materialNum: newMaterialNum
            })
        }catch(error){
            console.log(error)
        }
        handleClose();
    }

    return(
        <div>
        <p className={`editButton ${props.displayState}`}><span onClick={() => setShowModal(true)}>Edit</span></p>
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
            <input value={newFormValue} onChange={(e) => setNewFormValue(e.target.value)} />
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
                <input value={newBOM} type={'text'} onChange={(e) => setNewBOM(e.target.value)}></input>
              </div>
            </div>
            <div>
              <label>Number of Material</label>
            </div>
            <div>
              <input value={newMaterialNum} type={'number'} onChange = {(e)=> setNewMaterialNum(e.target.value)}></input>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={handleClose}>
                Close
              </button>
              <button className="primary-button" onClick={(e) => editCardData(e, props.firestore)}>
                Edit Project
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
    )
}

export default EditComp