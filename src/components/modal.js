import React, { Component, useState, useRef } from 'react';
import Modal from "react-overlays/Modal";

function Modal_html() {
    const [showModal, setShowModal] = useState(false);
    const renderBackdrop = (props) => <div className="backdrop" {...props} />;
    var handleClose = () => setShowModal(false);
    var handleSuccess = () => {
        console.log("success");
    };
    return (
        <div className="modal-example">
        <div>
          <button type="button" onClick={() => setShowModal(true)}>
            Create New Entry
          </button>
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
              <div className="modal-title">Modal Heading</div>
              <div>
                <span className="close-button" onClick={handleClose}>
                  x
                </span>
              </div>
            </div>
            <div className="modal-desc">
              <p>Modal body contains text.</p>
              <input type="text" id="fname" name="fname"/>
            </div>
            <div className="modal-footer">
              <button className="secondary-button" onClick={handleClose}>
                Close
              </button>
              <button className="primary-button" onClick={handleSuccess}>
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      </div>
    )
}

export default Modal_html;