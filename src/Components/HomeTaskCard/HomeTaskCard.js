import React from 'react';
import { Link } from 'react-router-dom';

function HomeTaskCard({ task, color }) {
  return (
    <div className='col-lg-3 col-md-4'>
      <Link to={`/register/${task._id}`} style={{ textDecoration: 'none' }}>
        <div
          className={`card   bg-${color} my-3`}
          style={{
            borderRadius: '10px',
            maxWidth: '300px',
            maxHeight: '450px',
          }}>
          <img
            className='image-fluid'
            src={task.imageURL}
            alt={task.eventTitle}
            style={{ height: '200px' }}
          />
          <div className='card-title'>
            <h6 className='text-center text-white py-2'>{task.eventTitle}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HomeTaskCard;
