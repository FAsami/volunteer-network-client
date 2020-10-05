import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './Components/Admin/Admin';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import RegisterVolunteer from './Components/VolunteerRegistration/RegisterVolunteer';
import EventTasks from './Components/EventTasks/EventTasks';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import AdminLogin from './Components/AdminLogin/AdminLogin';

export const UserContext = createContext();
export const EventContext = createContext();
export const TasksContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(`https://volunteer-network-fasami.herokuapp.com/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  useEffect(() => {
    fetch(
      `https://volunteer-network-fasami.herokuapp.com/volunteer-events/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [user]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <EventContext.Provider value={{ events, setEvents }}>
          <TasksContext.Provider value={{ tasks, setTasks }}>
            <div className='container-fluid'>
              <Switch>
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route path='/login'>
                  <Login />
                </Route>
                <Route path='/admin-login'>
                  <AdminLogin />
                </Route>
                <Route path='/admin'>
                  <Admin />
                </Route>
                <PrivateRoute path='/register/:id'>
                  <RegisterVolunteer />
                </PrivateRoute>
                <Route path='/register'>
                  <RegisterVolunteer />
                </Route>
                <PrivateRoute path='/event-tasks'>
                  <EventTasks />
                </PrivateRoute>
                <Route path='*'>
                  <NotFound />
                </Route>
              </Switch>
            </div>
          </TasksContext.Provider>
        </EventContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
