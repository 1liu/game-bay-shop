import React from 'react';

export default function Notification(props) {

  return (
    <div className="backdrop position-fixed d-flex h-100 w-100">
      <div className="modal-contents m-auto bg-white border rounded mt-5 p-3">
        <h2 className="m-2">Welcome to Game Bay!</h2>
        <p className="m-2">Please note that this website is a content management application created for the purpose of demonstration. Merchandise shown here is not available for purchase. Please DO NOT provide your real financial or personal information.</p>
        <form onSubmit={event => {
          event.preventDefault();
          props.closeModal();
        }}>
          <div className="btn-group w-100 p-1">
            <button className="btn btn-danger w-100">I acknowledge that this is strictly a demo.</button>
          </div>
        </form>
      </div>
    </div>
  );

}
