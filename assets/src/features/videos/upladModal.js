import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import { Modal, Typography, IconButton, Button } from '@material-ui/core';
import { Cancel, AddCircleOutline } from '@material-ui/icons';

const ModalBody = styled.div`
  width: 400px;
  height: 400px;
  background-color: white;
  padding: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:focus {
    border: none;
    outline: none;
  }
`;

const UploadButton = styled(Button)`
  && {
    position: fixed;
    bottom: 8px;
    right: 8px;
  }
`;

const CancelButton = styled(IconButton)`
  && {
    margin-bottom: 16px;
  }
`;

const DropZone = styled.div`
  width: calc(100% - 24px);
  height: 300px;
  margin-top: 0;
  margin: 8px;
  border: 3px dashed #888888;
  position: relative;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const UploadMessageBox = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-25%);
  width: 90%;
`;

const AddIcon = styled(AddCircleOutline)`
  && {
    width: 100%;
  }
`;

const UploadModal = ({ show, onClose, onUpload }) => {
  const [inZone, setInZone] = useState(false);
  const [allowDrop, setAllowDrop] = useState(true);
  const [upload, setUpload] = useState(null);
  const ref = useRef();

  const handleClose = () => {
    setAllowDrop(true);
    setInZone(false);
    setUpload(null);
    onClose();
  };

  const handleEnter = (e) => {
    e.preventDefault();
    setInZone(true);
  };

  const handleExit = (e) => {
    e.preventDefault();
    setInZone(false);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setInZone(true);
  };

  const handleFile =(file) => {
    if(!file.type.startsWith('video')) {
      alert('Invalid file type');
      return;
    }

    file.preview = URL.createObjectURL(file);
    setUpload(file);
    setAllowDrop(false);
  }

  const onFileChange = (e) => {
    handleFile(e.target.files[0]);
  }

  const handleDrop = (e) => {
    e.preventDefault();
    if (!allowDrop) return;

    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    onUpload(upload);
    onClose();
  }

  let display = (
    <DropZone onClick={() => ref.current.click()}>
      <HiddenInput ref={ref} type="file" onChange={onFileChange} />
      <UploadMessageBox>
        <AddIcon fontSize="large" />
        <Typography variant="h6" align="center">Add File</Typography>
      </UploadMessageBox>
    </DropZone>
  );

  if (upload) {
    display = (
      <>
        <video width="400" controls>
          <source src={upload.preview} type={upload.type} />
        </video>
        <Typography align="center">{upload.name}</Typography>
        <UploadButton color="primary" variant="contained" onClick={handleUpload}>Upload</UploadButton>
      </>
    );
  }

  return (
    <Modal open={show} onClose={handleClose}>
      <ModalBody
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleEnter}
        onDragLeave={handleExit}
        data-dragover={inZone && allowDrop}
      >
        <CancelButton onClick={handleClose} color="primary" size="small" >
          <Cancel fontSize="large" />
        </CancelButton>
        {display}
      </ModalBody>
    </Modal>
  );
};

export default UploadModal;
