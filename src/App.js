import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Components/RegisterPage';
import LoginPage from './Components/LoginPage';
import AddPost from './Components/AddBlog';
import EditPost from './Components/EditBlog';
import Navbar from './Components/NavBar';
import Dashboard from './Components/Dashboard';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <Box>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add" element={<AddPost posts={posts} setPosts={setPosts} />} />
          <Route path="/edit/:id" element={<EditPost posts={posts} setPosts={setPosts} />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
