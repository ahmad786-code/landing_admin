import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';


import './App.css';
import Auth from './screens/Auth';
import Emails from './screens/Emails';
import Header from './components/Header';
import CreateTopStories from './screens/CreateTopStories';

import CreateFeaturedStories from './screens/CreateFeaturedStories';
import AddUsers from './screens/AddUsers';
import StoryEditor from './screens/StoryEditor';



function App() {
  const [user, setUser] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const ADMIN_USER_ID = 'UhcvKoAb8lP5V9da9qMBy9PNxR03';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false once user state is updated
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking the auth state
  }


  return (
    <>
      <Router>
        {user && <Header onLogout={handleLogout} user={user} admin={ADMIN_USER_ID}/>}
        <div>
          <Routes>
            <Route path="/" element={<Auth setUser={setUser} />} />
            {user && <Route path="/emails" element={<Emails />} />}

            {user && <Route path="/stories" element={<StoryEditor />} />}

            {user && user.uid === ADMIN_USER_ID ? (
              <Route path="/add-users" element={<AddUsers />} />
            ) : (
              <Route path="/add-users" element={<Navigate to="/" replace />} />
            )}
            {!user && <Route path="*" element={<Navigate to="/" replace />} />}


          </Routes>

        </div>
      </Router>

    </>
  );
}

export default App;
