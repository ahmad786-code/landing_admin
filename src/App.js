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



function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        {user && <Header onLogout={handleLogout}/>}
        <div>
          <Routes>
          <Route path="/" element={<Auth setUser={setUser} />} />
          {user && <Route path="/emails" element={<Emails />} />}
          {user && <Route path="/top" element={<CreateTopStories />} />}
          {user && <Route path="/featured" element={<CreateFeaturedStories />} />}
          {!user && <Route path="*" element={<Navigate to="/" replace />} />}
          </Routes>

        </div>
      </Router>

    </>
  );
}

export default App;
