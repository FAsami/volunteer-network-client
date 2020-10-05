import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import { FiUsers } from 'react-icons/fi';
import { BiPlus } from 'react-icons/bi';
import AddEvent from '../AddEvent/AddEvent';
import RegisteredVolunteerList from '../RegisteredVoulunteerList/RegisterVolunteerList';

function Admin() {
  const [addEvent, setAddEvent] = useState(true);
  return (
    <div className='row'>
      <div className='col-md-3'>
        <div className='p-5'>
          <Link to='/'>
            <img
              className='image-fluid w-100'
              src={logo}
              alt='Volunteer Network'
            />
          </Link>
        </div>
        <div>
          <p
            className='text-dark d-inline-block text-decoration-none font-weight-bold'
            style={{ cursor: 'pointer' }}
            onClick={() => setAddEvent(false)}>
            <FiUsers /> Volunteer Register List
          </p>
          <br />
          <p
            className='text-dark  d-inline-block text-decoration-none font-weight-bold'
            style={{ cursor: 'pointer' }}
            onClick={() => setAddEvent(true)}>
            <BiPlus /> Add Event
          </p>
        </div>
      </div>
      {addEvent ? <AddEvent /> : <RegisteredVolunteerList />}
    </div>
  );
}

export default Admin;
