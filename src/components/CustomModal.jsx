import React from "react";
import Modal from "react-modal";
const CustomModal = ({ isOpen, setOpen, children }) => {
  const customStyles = {
    content: {
      top: '50%',//window.innerWidth > 900 ? "54%" : "52%"
      left: "50%",
      right: "auto",
      bottom: "auto",
      //   marginRight: '-50%',
      transform: "translate(-50%, -50%)",
      minWidth: "50vw",
      minHeight: "55vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      background: "transparent",
      border: "none",
    },
    overlay: {
      zIndex: "10000",
    },
  };
  return (
    <Modal
      closeTimeoutMS={100}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      isOpen={isOpen}
      ariaHideApp={false}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => setOpen(false)}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
