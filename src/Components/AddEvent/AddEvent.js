import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdEventNote } from 'react-icons/md';
import { firebaseApp, storage } from '../../Configs/firebaseConfig';

function AddEvent() {
  const [eventData, setEventData] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [hideAlert, setHideAlert] = useState(true);
  const [error, setError] = useState('');
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const storageRef = firebaseApp.storage().ref(`event/${file.name}`);
    const task = storageRef.put(file);
    task.on(
      'state_changed',
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(`Uploading:  ${Math.round(percentage)}`);
      },
      (error) => setError(error),
      () =>
        storage
          .ref('event')
          .child(file.name)
          .getDownloadURL()
          .then((url) => setImageURL(url))
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch('https://sleepy-earth-37099.herokuapp.com//add-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...eventData, imageURL }),
    })
      .then((response) => response.json())
      .then((inserted) => {
        if (inserted) {
          setHideAlert(false);
          setTimeout(() => setHideAlert(true), 3000);
          setLoading(false);
          setImageURL('');
          setFileName('');
          setUploadPercentage('');
        }
      });
    e.target.reset();
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEventData({ ...eventData, [name]: value });
  };
  return (
    <div className='col-md-9'>
      <h4 className='bg-white pt-3'>
        <MdEventNote /> Add Event
      </h4>
      <div className={hideAlert ? 'd-none' : 'alert alert-success'}>
        Record added successfully
      </div>
      <div className='bg-light w-100' style={{ height: '100vh' }}>
        <div className='p-3'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='font-weight-bold' htmlFor='event-title'>
                    Event title
                  </label>
                  <input
                    type='text'
                    name='eventTitle'
                    className='form-control'
                    id='event-title'
                    onChange={(e) => handleChange(e)}
                    placeholder='Event title'
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='font-weight-bold' htmlFor='event-date'>
                    Event Date
                  </label>
                  <input
                    type='date'
                    className='form-control'
                    onChange={(e) => handleChange(e)}
                    name='eventDate'
                    id='event-date'
                    placeholder='Date'
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group w-100'>
                  <label className='font-weight-bold' htmlFor='description'>
                    Description
                  </label>
                  <textarea
                    className='form-control'
                    id='description'
                    onChange={(e) => handleChange(e)}
                    name='eventDescription'
                    placeholder='Enter description'
                    rows='3'></textarea>
                </div>
              </div>
              <div className='col-md-6'>
                <label className='font-weight-bold' htmlFor='event-date'>
                  Banner
                </label>
                <div className='input-group'>
                  <div className='custom-file'>
                    <input
                      type='file'
                      className='custom-file-input'
                      name='image'
                      id='uploadImage'
                      onChange={(e) => handleImageUpload(e)}
                    />
                    <label className='custom-file-label' htmlFor='uploadImage'>
                      <AiOutlineCloudUpload />
                      Upload
                    </label>
                  </div>
                </div>
                <p></p>
                <p className='text-success'>
                  <span className='text-danger'>{error.errorMessage}</span>
                  <span className='text-dark'>{fileName}</span>
                  <br />
                  {uploadPercentage === 'Uploading:  100'
                    ? 'File uploaded successfully'
                    : uploadPercentage}
                </p>
              </div>
              <button
                type='submit'
                className='btn btn-primary ml-auto'
                disabled={!imageURL || loading}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
