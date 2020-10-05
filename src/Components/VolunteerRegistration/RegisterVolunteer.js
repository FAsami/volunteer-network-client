import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { EventContext, TasksContext, UserContext } from '../../App';
import logo from '../../img/logo.png';
import Navbar from '../Navbar/Navbar';

function RegisterVolunteer() {
  const [volunteer, setVolunteer] = useState({});
  const { events, setEvents } = useContext(EventContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const { tasks } = useContext(TasksContext);
  const history = useHistory();
  const task = tasks.find((task) => task._id === id);
  const { imageURL, eventTitle } = task;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setVolunteer({ ...volunteer, [name]: value });
  };

  const handleSubmit = (e) => {
    const event = { ...user, ...volunteer, image: imageURL, title: eventTitle };
    e.preventDefault();
    fetch('https://sleepy-earth-37099.herokuapp.com//register-volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((result) => {
        setEvents([...events, result]);
        if (result) history.replace('/event-tasks');
      });
  };

  return (
    <>
      <Navbar />
      <div className='d-flex flex-column align-items-center'>
        <div>
          <img
            className='image-flex w-100'
            src={logo}
            alt='Volunteer Network'
            style={{ height: '50px', maxWidth: '200px' }}
          />
        </div>
        <div className='card p-4'>
          <h3 className='text-center mb-3'>Register as a volunteer</h3>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type='text'
              className='form-control my-3 border-top-0 border-left-0 border-right-0'
              value={user.name}
              placeholder='Full Name'
              readOnly
              required
            />
            <input
              type='email'
              className='form-control my-3 border-top-0 border-left-0 border-right-0'
              value={user.email}
              placeholder='Email'
              readOnly
              required
            />
            <input
              type='date'
              className='form-control my-3 border-top-0 border-left-0 border-right-0'
              name='date'
              onChange={(e) => handleChange(e)}
              placeholder='Date'
              required
            />

            <input
              type='text'
              className='form-control my-3 border-top-0 border-left-0 border-right-0'
              name='description'
              onChange={(e) => handleChange(e)}
              placeholder='Description'
              required
            />

            <input
              type='text'
              className='form-control my-3 border-top-0 border-left-0 border-right-0'
              name='task'
              value={eventTitle}
              readOnly
            />

            <input
              type='submit'
              className='btn btn-primary btn-block mt-3'
              value='Registration'
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterVolunteer;
