import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function AdminLogin() {
  const history = useHistory();
  return (
    <div>
      <Navbar />
      <div className='d-flex  align-items-center justify-content-center'>
        <div className='card  p-3' style={{ maxWidth: '600px' }}>
          <h3>Login as Admin</h3>
          <div className='form-group'>
            <input
              type='text'
              className='form-control my-2'
              placeholder='Username or Email'
            />
            <input
              type='Password'
              className='form-control my-2'
              placeholder='password'
            />
            <input
              type='submit'
              className='form-control btn btn-info my-2'
              value='Login'
              onClick={() => history.replace('/admin')}
            />
            <small>
              Don't have an account ?
              <span className='text-info'>Create an account</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
