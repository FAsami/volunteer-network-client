import React, { useContext, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { FcCancel } from 'react-icons/fc';
import { EventContext } from '../../App.js';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function EventTasks() {
  const [showAlert, setShowAlert] = useState(false);
  const { events, setEvents } = useContext(EventContext);

  const handleDelete = (id) => {
    fetch(`https://sleepy-earth-37099.herokuapp.com//delete-event/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((deleted) => {
        if (deleted) {
          const allEvents = events.filter((event) => event._id !== id);
          setEvents(allEvents);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }
      });
  };

  if (events.length === 0) {
    return (
      <div>
        <Navbar />
        <h3 className='display-4 text-center mt-5'>No task found !</h3>
        <div className='d-flex justify-content-center'>
          <Link className='btn btn-info btn-lg' to='/'>
            <FaHome /> Add Some task <AiOutlineArrowRight />
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className='bg-light'>
      <Navbar />
      <div className={showAlert ? `alert alert-danger` : 'd-none'}>
        Event deleted successfully
      </div>
      <div className='row'>
        {events.map((event, index) => (
          <div className='col-md-6' key={index}>
            <div className='card p-3 m-2' style={{ borderRadius: '25px' }}>
              <div className='d-flex justify-content-center align-items-center'>
                <div>
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{ width: '200px' }}
                  />
                </div>
                <div className='card-body'>
                  <h5>{event.title}</h5>
                  <p className='card-text'>{event.date}</p>
                  <button
                    className='btn btn-sm btn-warning text-danger'
                    onClick={() => handleDelete(event._id)}>
                    <FcCancel /> cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventTasks;
