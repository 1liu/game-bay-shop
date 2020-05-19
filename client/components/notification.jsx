import React from 'react';

export default function Notification(props) {

  return (
    <div className="backdrop position-fixed d-flex h-100 w-100">
      <div className="modal-contents m-auto bg-white border rounded mt-5 p-3">
        <h2 className="m-2">Welcome to Wicked Sales!</h2>
        <p className="m-2">Please note that this website is a content management application created for the purpose of demonstration. Check the box below to acknowledge that the merchandise shown here is not available for purchase, that you will not provide genuine financial or personal information, and that you are aware no purchase will truly be processed.</p>
        <form onSubmit={event => {
          event.preventDefault();
          props.closeModal();
        }}>
          <div className="form-check m-2">
            <input className="form-check-input" type="checkbox" id="acknowledgement" required />
            <label className="form-check-label" htmlFor="acknowledgement">I acknowledge that this is strictly a demo application.</label>
          </div>
          <div className="btn-group w-100 p-1">
            <button className="btn btn-danger w-100">Proceed</button>
          </div>
        </form>
      </div>
    </div>
  );

}
