import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

const App = () => {
  const [registeredUsers] = useState([
    { email: 'user1@example.com', password: 'password1' },
    { email: 'user2@example.com', password: 'password2' },
    { email: 'user3@example.com', password: 'password3' },
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = (userData) => {
    const user = registeredUsers.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    if (user) {
      const storedTasks = localStorage.getItem(user.email + '_tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        user.tasks = parsedTasks;
      } else {
        user.tasks = [];
      }

      setCurrentUser(user);
      setError('');
      localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('Login successful');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    console.log('Logout successful');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const storedTasks = localStorage.getItem(parsedUser.email + '_tasks');
      parsedUser.tasks = storedTasks ? JSON.parse(storedTasks) : [];
      setCurrentUser(parsedUser);
    }
  }, []);

  return (
    <div>
      {currentUser && <Navbar handleLogout={handleLogout} />}
      {currentUser ? (
        <>
          <Dashboard user={currentUser} />
        </>
      ) : (
        <>
          <LoginForm handleLogin={handleLogin} />
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default App;
