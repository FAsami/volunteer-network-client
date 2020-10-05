import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import HomeTaskCard from '../HomeTaskCard/HomeTaskCard';
import { TasksContext } from '../../App';

function Home() {
  const { tasks } = useContext(TasksContext);
  const cardColors = ['primary', 'warning', 'danger', 'info', 'dark'];
  return (
    <div>
      <Navbar home={true} />
      <div>
        <h1 className='text-md-center mt-5'>
          I GROW BY HELPING PEOPLE IN NEED
        </h1>
        <div className=' d-flex align-items-center justify-content-center'>
          <div className='input-group' style={{ maxWidth: '500px' }}>
            <input type='text' className='form-control' placeholder='Search' />
            <div className='input-group-append'>
              <div className='input-group-text bg-primary text-white'>
                Search
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-5'>
        {tasks.map((task, index) => (
          <HomeTaskCard
            key={task._id}
            task={task}
            color={cardColors[index % cardColors.length]}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
