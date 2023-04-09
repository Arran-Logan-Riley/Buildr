import React, { useState } from 'react';
import "firebase/firestore";
import Modal from "react-overlays/Modal";

function EditComp(props) {
  const [showModal, setShowModal] = useState(false);
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  var handleClose = () => setShowModal(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [newMaterialNum, setNewMaterialNum] = useState('');
  const editCardData = async (e) => {
    e.preventDefault();
    try {
      await props.firestore.collection('messages').doc(props.msgId).update({
        projectName: newProjectName,
        material: newMaterial,
        materialNum: newMaterialNum,
        startDate: newStartDate,
        endDate: newEndDate
      })
    } catch (error) {
      console.log(error)
    }
    handleClose();
  }
  function handleFalseUid() {
    setShowModal(false);
    alert('You do not own this message (ID mismatch)');
  }

  return (
    <div>
      <p className={`editButton ${props.displayState}`}><span onClick={a => (props.uid == props.currentUser) ? setShowModal(true) : handleFalseUid()}>Edit</span></p>
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
            <input value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
            <div>
              <div>
                <label>Start Date</label>
              </div>
              <input value={newStartDate} type={'date'} onChange={(e) => setNewStartDate(e.target.value)}></input>
            </div>
            <div>
              <div>
                <label>End Date</label>
              </div>
              <input value={newEndDate} type={'date'} onChange={(e) => setNewEndDate(e.target.value)}></input>
            </div>
            <div>
              <label>Name of Material</label>
              <div>
                <input value={newMaterial} type={'text'} onChange={(e) => setNewMaterial(e.target.value)}></input>
              </div>
            </div>
            <div>
              <label>Number of Material</label>
            </div>
            <div>
              <input value={newMaterialNum} type={'number'} onChange={(e) => setNewMaterialNum(e.target.value)}></input>
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