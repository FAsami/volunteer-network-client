import React, { useContext } from 'react';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import 'bootstrap/js/src/collapse';
import { UserContext } from '../../App';

function Navbar(props) {
  const { user } = useContext(UserContext);

  return (
    <nav className='navbar navbar-expand-lg navbar-light'>
      <Link className='navbar-brand' to='/'>
        <img
          className='image-fluid'
          src={logo}
          alt='Volunteer Network'
          style={{ height: '50px' }}
        />
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavAltMarkup'
        aria-controls='navbarNavAltMarkup'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
        <div className='navbar-nav ml-auto'>
          <Link className='nav-item nav-link font-weight-bold text-dark' to='/'>
            Home
          </Link>
          <Link
            className='nav-item nav-link font-weight-bold text-dark'
            to='/donation'>
            Donation
          </Link>
          <Link
            className='nav-item nav-link font-weight-bold text-dark'
            to='/event-tasks'>
            Events
          </Link>
          <Link
            className='nav-item nav-link font-weight-bold text-dark'
            to='/blogs'>
            Blogs
          </Link>
          {user.name && (
            <Link
              className='nav-item nav-link font-weight-bold text-dark'
              to='/user'>
              {user.name}
            </Link>
          )}
          {props.home && (
            <Link className='px-2  mb-2' to='/login'>
              <button className='btn  btn-sm btn-primary' disabled>
                Register
              </button>
            </Link>
          )}
          {props.home && (
            <Link className='px-2' to='/admin-login'>
              <button className='btn btn-sm btn-secondary'>Admin</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
