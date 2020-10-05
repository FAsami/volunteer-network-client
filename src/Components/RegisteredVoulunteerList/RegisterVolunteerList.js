import React, { useEffect, useState } from 'react';
import { FaRegTrashAlt, FaListUl } from 'react-icons/fa';

function RegisterVolunteerList() {
  const [allTask, setAllTask] = useState([]);
  useEffect(() => {
    fetch(`https://volunteer-network-fasami.herokuapp.com/events`)
      .then((res) => res.json())
      .then((data) => setAllTask(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://volunteer-network-fasami.herokuapp.com/delete-event/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((deleted) => {
        if (deleted) {
          const newTask = allTask.filter((event) => event._id !== id);
          setAllTask(newTask);
        }
      });
  };
  return (
    <div className='col-md-9'>
      <h4 className='bg-white pt-3'>
        <FaListUl /> Registered Volunteer List
      </h4>
      <div className='bg-light w-100' style={{ height: '100vh' }}>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Registered on</th>
                <th>Event</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allTask.map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.email}</td>
                  <td>{task.date}</td>
                  <td>{task.title}</td>
                  <td
                    onClick={() => handleDelete(task._id)}
                    style={{ cursor: 'pointer' }}>
                    <FaRegTrashAlt />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RegisterVolunteerList;
